import { Types } from 'mongoose';

import newPostDTO from "../DTO/newPostDTO";
import postWhithUserDTO from "../DTO/postWhithUserDTO";
import responseData from "../DTO/responceDataDTO";
import updatePostDTO from "../DTO/updatePostDTO";
import postModel from "../models/postModel";
import userModel from "../models/userModel";
import addCommentDTO from '../DTO/addCommentDTO';
import postWhitCommentsDTO from '../DTO/postWhitCommentsDTO';
export default class PostService{
    public static async createPost(newPost:newPostDTO,userId:string):Promise<responseData<{ id: string }>>{
        try {                        
            const { title, content,author } = newPost;
            const dbPost = new postModel({
              title,
              content,

              author
              });     
            await dbPost.save() 
            const user = await userModel.findById(userId);
        if (!user) {
            return {
                err: true,
                message: "User not found",
                status: 404,
                data: null
            };
        }
        
        user.posts.push(dbPost._id as Types.ObjectId);
            await user.save();
            const populatedPost = await postModel.findById(dbPost._id).populate('author', 'id username email');

            return {
                err: false,
                message: "created",
                status: 200,
                data:populatedPost
            };
        } catch (error) {
            return {
                err: true,
                message: "server eror",
                status: 500,
                data:error
            };
        }
    }
    public static async getAllPosts(): Promise<responseData<postWhithUserDTO>>  {
        try {
            const posts = await postModel.find({})
            .select('id title content author')
            .populate('author', 'id username email');
            return {
                err: false,
                message: "Fetched posts successfully",
                status: 200,
                data: posts
            };
        } catch (error) {
            console.error("Error fetching posts:", error); 
            return {
                err: true,
                message: "Server error",
                status: 500,
                data: error 
            };
        }
    }
    public static async getByPostId(postid: string) :Promise<responseData<postWhithUserDTO>>{
        try {
            const post = await postModel.findById(postid) 
            .select('id title content author') 
            .populate('author', 'id username email');

            if (!post) {
                return {
                    err: true,
                    message: "post not found",
                    status: 404,
                    data: null 
                };
            }
            return {
                err: false,
                message: "Fetched post successfully",
                status: 200,
                data: post
            };
        } catch (error) {
            console.error("Error fetching user:", error); 
            return {
                err: true,
                message: "Server error",
                status: 500,
                data: error 
            };
        }
    }
    public static async updatePost(postid: string,newPost:updatePostDTO) :Promise<responseData<postWhithUserDTO>>{
        try {
            const {title,content} = newPost
            const post = await postModel.findByIdAndUpdate
            (
                postid,
                {$set:{title:title,content:content}},
                { new: true, runValidators: true }          
            )
            .select('id title content author') 
            .populate('author', 'id username email');

            if (!post) {
                return {
                    err: true,
                    message: "post not found",
                    status: 404,
                    data: null 
                };
            }
            return {
                err: false,
                message: "post update successfully",
                status: 200,
                data: post
            };
        } catch (error) {
            console.error("Error fetching post:", error); 
            return {
                err: true,
                message: "Server error",
                status: 500,
                data: error 
            };
        }
    }
    public static async deleteByPostId(postid: string,userId:string) :Promise<responseData<postWhithUserDTO>>{
        try {            
            const post = await postModel.findById(postid) 
            .select('author') 

            if(!post)
            {
                return {
                    err: true,
                    message: "post not found",
                    status: 404,
                    data: null 
                };  
            }
            if(post.author.toString() != userId)
            {
                return {
                    err: true,
                    message: "user not mach to the post",
                    status: 404,
                    data: null 
                };   
            }
            const user = await userModel.findById(post.author)

            if(!user)
            {
                return {
                    err: true,
                    message: "user not found",
                    status: 404,
                    data: null 
                };
            }
          
            await userModel.updateOne(
                { _id: post?.author },
                { $pull: { posts: postid } }
                );

            const result = await postModel.deleteOne({ _id: postid });

            
            return {
                err: false,
                message: "Fetched post successfully",
                status: 200,
                data: postid
            }
            
        } catch (error) {
            console.error("Error fetching user:", error); 
            return {
                err: true,
                message: "Server error",
                status: 500,
                data: error 
            };
        }
    }
    public static async handelAddComment(postid:string,comment:addCommentDTO) :Promise<responseData<postWhitCommentsDTO>>{
        try {
            const {content,author} = comment
            const post = await postModel.findByIdAndUpdate
            (
                postid,
                {$push:{comments:comment}},
                { new: true, runValidators: true }          
            )
            .select('id title content comments') 

            if (!post) {
                return {
                    err: true,
                    message: "post not found",
                    status: 404,
                    data: null 
                };
            }
            return {
                err: false,
                message: "comment aded successfully",
                status: 200,
                data: post
            };
        } catch (error) {
            console.error("Error fetching post:", error); 
            return {
                err: true,
                message: "Server error",
                status: 500,
                data: error 
            };
        }
    }
}
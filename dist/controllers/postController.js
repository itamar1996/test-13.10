"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addComment = exports.updatePost = exports.getPost = exports.getPosts = exports.deletePost = exports.createPost = void 0;
const postService_1 = __importDefault(require("../services/postService"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// Create a new post
const createPost = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const token = req.cookies.auth_token;
        const decodedToken = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        const userId = decodedToken.id;
        const result = yield postService_1.default.createPost(req.body, userId);
        res.status(200).json(result);
    }
    catch (error) {
        console.log(error);
    }
});
exports.createPost = createPost;
// Delete a post
const deletePost = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const token = req.cookies.auth_token;
        const decodedToken = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        const userId = decodedToken.id;
        const result = yield postService_1.default.deleteByPostId(req.params.id, userId);
        res.status(200).json(result);
    }
    catch (error) {
        console.log(error);
    }
});
exports.deletePost = deletePost;
const getPosts = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield postService_1.default.getAllPosts();
        res.status(200).json(result);
    }
    catch (error) {
        console.log(error);
    }
});
exports.getPosts = getPosts;
const getPost = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield postService_1.default.getByPostId(req.params.id);
        res.status(200).json(result);
    }
    catch (error) {
        console.log(error);
    }
});
exports.getPost = getPost;
const updatePost = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield postService_1.default.updatePost(req.params.id, req.body);
        res.status(200).json(result);
    }
    catch (error) {
        console.log(error);
    }
});
exports.updatePost = updatePost;
// Add a comment to a post
const addComment = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield postService_1.default.handelAddComment(req.params.id, req.body);
        res.status(200).json(result);
    }
    catch (error) {
        console.log(error);
    }
});
exports.addComment = addComment;

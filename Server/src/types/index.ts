
import {
  newAuthorSchema,
  newBookSchema,
  newReviewSchema,
  updateBookSchema,
} from "@/middlewares/validator";
import { RequestHandler } from "express";
import { z } from "zod";

type AuthorHandlerBody = z.infer<typeof newAuthorSchema>;
type NewBookBody = z.infer<typeof newBookSchema>;
type UpdateBookBody = z.infer<typeof updateBookSchema>;
type AddReviewBody = z.infer<typeof newReviewSchema>;

export type RequestAuthorHandler = RequestHandler<{}, {}, AuthorHandlerBody>;
export type CreateBookRequestHandler = RequestHandler<{}, {}, NewBookBody>;
export type UpdateBookRequestHandler = RequestHandler<{}, {}, UpdateBookBody>;
export type AddReviewRequestHandler = RequestHandler<{}, {}, AddReviewBody>;

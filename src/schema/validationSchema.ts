import { z } from "zod";

export const createIssueSchema=z.object({
    title:z.string().min(1,'Title is required!'),
    description:z.string().min(1,'Description is required!'),
})

export const editIssueSchema=z.object({
    title:z.string().min(1,'Title is required!').optional(),
    description:z.string().min(1,'Description is required!').optional(),
    assignedUserId:z.string().optional().nullable()
})
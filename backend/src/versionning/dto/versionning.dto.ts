import { IsNumber, IsOptional, IsString } from "class-validator"

export class InitializeRepos {
    @IsString()
    workspaceName: string;
}

export class AddCommit {
    @IsString()
    workspaceName: string;
    @IsString()
    relativeRelativePath: string;
    @IsString()
    author: string;
    @IsString()
    message: string;
    @IsString()
    description: string;
}

/**
 * {
    "workspaceName": "workspace-1",
    "relativeRelativePath": "Features/order product/spec.md",
    "author": "foo bar baz <author@foobarz.com>",
    "message": "commit features product spec"
    ,"description": "this is a long description of the commit features product spec"}
 */

export class QueryHistory {
    @IsString()
    workspaceName: string;
    @IsString()
    relativeRelativePath: string;
    @IsNumber()
    @IsOptional()
    page: number;
    @IsNumber()
    @IsOptional()
    size: number;
}

export class ShowCommit {
    @IsString()
    workspaceName: string;
    @IsString()

    relativeRelativePath: string;
}
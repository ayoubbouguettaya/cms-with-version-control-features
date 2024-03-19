"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { WorkSpaceContext } from "@/store/context";
import { commitHistory } from "@/store/types";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";

import { GitCommitHorizontal, GitGraph, Undo2 } from "lucide-react";
import React, { useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";

type Props = {};

const VersionningPanelComponent = (props: Props) => {
  const {
    state: {
      activeItemPath,
      activeItemIsDirectory,
      activeWorkSpaceName,
      commitsHistory,
      author,
      workspace: data,
    } = {
      activeItemPath: "",
      activeItemIsDirectory: true,
      activeWorkSpaceName: "",
      workspace: null,
      commitsHistory: [],
      author: null
    },
    dispatch,
  } = useContext(WorkSpaceContext);

  useEffect(() => {
    fetchCommitHistory();
  }, [activeItemPath]);

  const submitCommit = async (message: string,description: string) => {
    console.log("submit commit", message,description);
    const commit= {
        "workspaceName": activeWorkSpaceName,
        "relativeRelativePath": activeItemPath,
        "author": `${author?.userName} <${author?.email}>`,
        message,
        description
    }

    try {
      await axios.post(`http://localhost:5000/versionning/commit`,commit);
    } catch (error) {
      console.log("error occured when submitting commit")
    }
    await fetchCommitHistory()
  };

  const fetchCommitHistory = async () => {
    try {
      const response = await axios.get(`
      http://localhost:5000/versionning/commit?workspaceName=${activeWorkSpaceName}&relativeRelativePath=${activeItemPath}`);

      const allCommits = response?.data?.all || [];

      dispatch?.({ type: "SET_COMMITS_HISTORY", payload: allCommits });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="w-96 p-3 bg-slate-100 border border-l-slate-200 h-[calc(100dvh-64px)]">
      <h2 className="bg-slate-500 text-green-300 p-2 rounded flex font-semibold border-b pb-2 mb-2">
        <GitGraph className="mr-1" />
        Versionning
      </h2>
      <div className="flex flex-col justify-between h-[calc(100%-60px)] ">
        <div className="flex flex-col   overflow-y-auto ">
          {commitsHistory.map((item) => (
            <CommitHistoryItem key={item.hash} {...item} />
          ))}
        </div>
        <AddCommitForm submitCommit={submitCommit} />
      </div>
    </div>
  );
};

export default VersionningPanelComponent;

const CommitHistoryItem = (prop: commitHistory) => {
  return (
    <div className="p-4 border-slate-300 border-1">
      <p>
        <small> @{prop.author_name}</small>
      </p>
      <blockquote className="border-l-4 pl-2 border-green-500">
        {prop.message}
      </blockquote>
      <p>{new Date(prop.date).toLocaleString()}</p>
      <div className="flex mt-1 items-center">
        <CommitShowModal hash={prop.hash} />
        <Button disabled className="ml-2" size={"icon"} variant={"outline"}>
          <Undo2 />{" "}
        </Button>
      </div>
    </div>
  );
};

const CommitShowModal = ({ hash }: { hash: string }) => {
  return (
    <Dialog>
      <DialogTrigger className="ml-2 p-2 bg-green-400 border border-gray-300">
        <GitCommitHorizontal />
      </DialogTrigger>
      <DialogContent className="sm:max-w-[1000px] h-[80%] overflow-y-scroll">
        <div>{hash} </div>
        <DialogFooter className="h-14 mt-auto">
          <DialogClose>Close</DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export type CommitForm = {
  commitMessage: string;
  commitDescription: string;
};

const AddCommitForm = (prop: {
  submitCommit: (commitMessage: string,desc:string) => void;
}) => {
  const form = useForm<CommitForm>({
    defaultValues: {
      commitMessage: "",
      commitDescription: "",
    },
  });

  function onSubmit(values: CommitForm) {
    prop.submitCommit(values.commitMessage,values.commitDescription);
  }

  return (
    <div className="h-[300px]">
      <Separator />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="commitMessage"
          render={({ field }) => (
            <FormItem>
              <FormLabel> Message</FormLabel>
              <FormControl>
                <Input placeholder="shadcn" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="commitDescription"
          render={({ field }) => (
            <FormItem>
              <FormLabel> Description</FormLabel>
              <FormControl>
                <Textarea rows={5} placeholder="shadcn" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button  className="mt-3" type="submit">
          Commit
        </Button>
        </form>
      </Form>
    </div>
  );
};

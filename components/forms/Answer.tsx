"use client";

import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/form";
import { z } from "zod";
import { AnswerSchema } from "@/lib/validations";
import { zodResolver } from "@hookform/resolvers/zod";
import { Editor } from "@tinymce/tinymce-react";

import { useRef, useState } from "react";
import { useTheme } from "next-themes";
import { usePathname } from "next/navigation";

import { Button } from "../ui/button";
// import Image from "next/image";
import { createAnswer } from "@/lib/actions/answer.actions";

import { toast } from "../ui/use-toast";

interface Props {
  question: string;
  questionId: string;
  authorId: string;
}

const Answer = ({ question, questionId, authorId }: Props) => {
  const pathname = usePathname();
  const [isSubmitting, setIsSubmitting] = useState(false);
  // const [isSubmittingAI, setIsSubmittingAI] = useState(false);
  const editorRef = useRef(null);
  const { resolvedTheme } = useTheme();
  const form = useForm<z.infer<typeof AnswerSchema>>({
    resolver: zodResolver(AnswerSchema),
    defaultValues: {
      answer: "",
    },
  });

  async function onSubmit(values: z.infer<typeof AnswerSchema>) {
    setIsSubmitting(true);
    try {
      await createAnswer({
        content: values.answer,
        author: JSON.parse(authorId),
        question: JSON.parse(questionId),
        path: pathname,
      });

      form.reset();

      if (editorRef.current) {
        const editor = editorRef.current as any;
        editor.setContent(" ");
      }

      toast({
        title: "Answer submitted",
        variant: "default",
      });
    } catch (error) {
      console.log(error);
    } finally {
      setIsSubmitting(false);
    }
  }

  // const generateAIAnswer = async () => {
  //   if (!authorId) {
  //     return;
  //   }

  //   setIsSubmittingAI(true);
  //   try {
  //     const response = await fetch(
  //       `${process.env.NEXT_PUBLIC_SERVER_URL}/api/chatgpt`, // ->folder->route/path.
  //       {
  //         method: "POST",
  //         body: JSON.stringify({ question }),
  //       }
  //     );

  //     const aiAnswer = await response.json();

  //     // convert plain text to HTML format

  //     const formattedAnswer = aiAnswer.reply.replace(/\n/g, "<br/>");

  //     if (editorRef.current) {
  //       const editor = editorRef.current as any;
  //       editor.setContent(formattedAnswer);
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   } finally {
  //     setIsSubmittingAI(false);
  //   }
  // };

  return (
    <div>
      <div className="mt-5 flex flex-col justify-between gap-5 sm:flex-row sm:items-center sm:gap-2">
        <h4 className="paragraph-semibold text-dark400_light800">
          Write your answere here
        </h4>
        {/* <Button
          className="btn light-border-2 gap-1.5 rounded-md px-4 py-2.5 text-primary-500 shadow-none dark:text-primary-500"
          onClick={generateAIAnswer}
          disabled={isSubmittingAI}
        >
          {isSubmittingAI ? (
            <>Generating...</>
          ) : (
            <>
              <Image
                src="/assets/icons/stars.svg"
                alt="star"
                width={12}
                height={12}
                className="object-contain"
              />
              Generate AI Answer
            </>
          )}
        </Button>  */}
      </div>
      <Form {...form}>
        <form
          className="mt-6 flex w-full flex-col gap-10"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <FormField
            control={form.control}
            name="answer"
            render={({ field }) => (
              <FormItem className="flex w-full flex-col gap-3">
                <FormControl className="mt-3.5">
                  <Editor
                    key={resolvedTheme}
                    apiKey={process.env.NEXT_PUBLIC_TINY_EDITOR_API_KEY}
                    onInit={(evt, editor) =>
                      // @ts-ignore
                      (editorRef.current = editor)
                    }
                    onBlur={field.onBlur}
                    onEditorChange={(content) => field.onChange(content)}
                    init={{
                      height: 350,
                      menubar: false,
                      plugins: [
                        "advlist",
                        "autolink",
                        "lists",
                        "link",
                        "image",
                        "charmap",
                        "preview",
                        "anchor",
                        "searchreplace",
                        "visualblocks",
                        "codesample",
                        "fullscreen",
                        "insertdatetime",
                        "media",
                        "table",
                      ],
                      toolbar:
                        "undo redo |  " +
                        "codesample | bold italic forecolor | alignleft aligncenter | " +
                        "alignright alignjustify | bullist numlist outdent indent | ",
                      content_style:
                        "body { font-family:Inter,Helvetica,sans-serif; font-size:16px }",
                      skin: resolvedTheme === "dark" ? "oxide-dark" : "oxide",
                      content_css: resolvedTheme === "dark" ? "dark" : "light",
                    }}
                  />
                </FormControl>
                <FormMessage className="text-red-500" />
              </FormItem>
            )}
          />

          <div className="flex justify-end">
            <Button
              type="submit"
              className="primary-gradient w-fit text-white"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Submitting..." : "Submit"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default Answer;

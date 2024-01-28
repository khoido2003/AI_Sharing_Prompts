import Link from "next/link";
import { Form } from "react-hook-form";
import {
  Control,
  FieldErrors,
  FormState,
  SubmitHandler,
  UseFormHandleSubmit,
  UseFormRegister,
  UseFormWatch,
} from "react-hook-form";

import { Inputs } from "../create-prompt/page";
import { roboto } from "../utils/fonts";
import { Toaster } from "@/components/ui/sonner";

export interface FormProps {
  type: string;
  register: UseFormRegister<Inputs>;
  watch: UseFormWatch<Inputs>;
  handleSubmit: UseFormHandleSubmit<Inputs, undefined>;
  onSubmitForm: SubmitHandler<Inputs>;
  errors: FieldErrors<Inputs>;
  control: Control<Inputs, any>;
  isLoading: boolean;
}

const FormComponent = ({
  type,
  register,
  watch,
  handleSubmit,
  onSubmitForm,
  errors,
  control,
  isLoading,
}: FormProps) => {
  return (
    <section className="flex-start w-full max-w-full flex-col">
      <h1 className="head_text">
        <span className="blue_gradient">{type} Post</span>
      </h1>

      <p className="desc max-w-md">
        {type} and share amazing prompts with the world, and let your
        imagination run wild with any AI-powered platform.
      </p>

      <form
        className="glassmorphism mt-10 flex w-full max-w-2xl flex-col gap-7"
        onSubmit={handleSubmit(onSubmitForm)}
      >
        <label>
          <span
            className={`${roboto.className} text-base font-semibold text-gray-700 dark:text-gray-200`}
          >
            Your AI Prompts
          </span>
          <textarea
            disabled={isLoading}
            placeholder="Write your prompt here..."
            className="form_textarea "
            {...register("prompt", {
              minLength: 20,
              required: "This field is required!",
            })}
          />

          {errors.prompt && (
            <p className="text-red-400">{errors.prompt?.message}</p>
          )}

          {errors.prompt?.type === "minLength" && (
            <p className="text-red-400">
              This field needs at least 20 characters!
            </p>
          )}
        </label>

        <label>
          <span
            className={`${roboto.className} text-base font-semibold text-gray-200 `}
          >
            Tag{" "}
            <span className="font-normal">
              (#product, #webdevelopment, #idea, etc.)
            </span>
          </span>

          <textarea
            disabled={isLoading}
            className="form_input"
            placeholder="#tag"
            {...register("tag", { required: "This field is required!" })}
          />

          {errors.tag && <p className="text-red-400">{errors.tag?.message}</p>}
        </label>

        <div className="flex-end mx-3 mb-5 gap-4">
          <Link href="/" className="text-sm text-gray-500 dark:text-gray-200">
            Cancel
          </Link>

          <button
            type="submit"
            className="rounded-full bg-primary-orange px-5 py-1.5 text-white hover:bg-slate-800  hover:text-slate-200 dark:hover:bg-slate-200 dark:hover:text-slate-900"
          >
            {isLoading ? `${type}...` : type}
          </button>
        </div>
      </form>

      <Toaster position="top-center" />
    </section>
  );
};

export default FormComponent;

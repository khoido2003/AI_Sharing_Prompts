import { DefaultSession } from "next-auth";
import {
  Control,
  FieldErrors,
  SubmitHandler,
  UseFormHandleSubmit,
  UseFormRegister,
  UseFormWatch,
} from "react-hook-form";

////////////////////////
/**
 * Interface for the session in AuthJS
 */
export interface DefaultSessionWithId extends DefaultSession {
  user?: {
    name?: string | null;
    email?: string | null;
    image?: string | null;
    id?: string | null; // Add the 'id' property
  };
}

////////////////////////

export interface PromptCardProps {
  post: {
    _id: string;
    creator: {
      _id: string;
      username: string;
      email: string;
      image: string;
    };
    prompt: string;
    tag: string;
    dateAdded?: string;
  };
  handleTagClick?: (a: string) => void;
  handleEdit?: () => void;
  handleDelete?: () => void;
}

////////////////////////

export type Inputs = {
  prompt: string;
  tag: string;
};

////////////////////////////

export interface PromptData {
  _id: string;
  creator: {
    _id: string;
    username: string;
    email: string;
    image: string;
  };
  prompt: string;
  tag: string;
  __v: number;
  dateAdded: string;
}

/////////////////////////////////////

export interface PromptCardListProps {
  data:
    | [
        post: {
          _id: string;
          creator: {
            _id: string;
            username: string;
            email: string;
            image: string;
          };
          prompt: string;
          tag: string;
        },
      ]
    | undefined
    | void;
  handleTagClick?: (a: string) => void | undefined;
  isLoading: boolean;
}

///////////////////////////////////

export interface FormPropsComponent {
  type: string;
  register: UseFormRegister<Inputs>;
  watch: UseFormWatch<Inputs>;
  handleSubmit: UseFormHandleSubmit<Inputs, undefined>;
  onSubmitForm: SubmitHandler<Inputs>;
  errors: FieldErrors<Inputs>;
  control: Control<Inputs, any>;
  isLoading: boolean;
  data?: {
    prompt: string;
    tag: string;
  };
  isFetchingCurrentPost?: boolean;
}

///////////////////////////////

export interface ProfileComponentProps {
  name: string | null | undefined;
  desc: string | null | undefined;
  data?: [PromptData] | void | undefined;
  handleEdit?: (post: { _id: string }) => void;
  handleDelete?: (post: { _id: string }) => void;
  isLoading?: boolean;
  error?: Error | null;
}

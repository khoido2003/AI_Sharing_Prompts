import {
  Control,
  FieldErrors,
  SubmitHandler,
  UseFormHandleSubmit,
  UseFormRegister,
  UseFormWatch,
} from "react-hook-form";

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
}

///////////////////////////////

export interface ProfileComponentProps {
  name: string | null | undefined;
  desc: string | null | undefined;
  data: [PromptData] | void | undefined;
  handleEdit: () => void;
  handleDelete: () => void;
  isLoading: boolean;
  error: Error | null;
}

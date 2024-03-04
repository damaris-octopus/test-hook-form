import useRenderCounter from "@/components/useRenderCount";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";

enum GenderEnum {
  female = "female",
  male = "male",
  other = "other",
}

interface IFormInput {
  firstName: string;
  lastName: string;
  gender: GenderEnum;
  age: number;
  pets: { name: string }[];
}

const schema = z
  .object({
    firstName: z.string().min(1, { message: "First name is required" }),
    lastName: z.string().min(1, { message: "Last name is required" }),
    gender: z.nativeEnum(GenderEnum),
    age: z.number().min(18, { message: "You must be 18 or older" }),
    pets: z.array(
      z.object({
        name: z.string().min(1, { message: "Pet name is required" }),
      })
    ),
  })
  .required();

export default function ValidationFormZod() {
  const renderCounter = useRenderCounter();

  const {
    register,
    handleSubmit,
    watch,
    control,
    reset,
    formState: { isDirty, isSubmitting, errors },
  } = useForm<IFormInput>({
    defaultValues: {
      firstName: "",
      lastName: "",
      gender: GenderEnum.female,
      age: 19,
      pets: [],
    },
    resolver: zodResolver(schema),
    mode: "onChange",
    delayError: 1000,
  });
  const onSubmit: SubmitHandler<IFormInput> = (data) => console.log(data);

  const { fields, append, prepend } = useFieldArray({
    control,
    name: "pets",
  });

  return (
    <>
      <h1>Validation Form with Zod</h1>
      <p> Rendercount {renderCounter}</p>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>First Name</label>
        <input
          {...register("firstName", { required: "This is required" })}
          placeholder="First Name"
        />
        <p> {errors.firstName?.message} </p>
        <label>Last Name</label>
        <input
          {...register("lastName", {
            required: "This is required",
            minLength: { value: 4, message: "Min length is 4" },
          })}
          placeholder="Last Name"
        />
        <p> {errors.lastName?.message} </p>
        <label>Age</label>
        <input
          {...register("age", {
            required: "This is required",
            valueAsNumber: true,
            max: 5,
          })}
          placeholder="Age"
        />
        <p> {errors.age?.message} </p>

        <label>Gender Selection</label>
        <select {...register("gender")}>
          <option value="" disabled selected hidden>
            Select a gender
          </option>
          <option value="female">female</option>
          <option value="male">male</option>
          <option value="other">other</option>
        </select>
        <p> {errors.gender?.message} </p>

        <label>Pets</label>
        <div>
          {fields.map((field, index) => {
            return (
              <>
                <input key={field.id} {...register(`pets.${index}.name`)} />
                <p>{errors.pets?.[index]?.name?.message}</p>
              </>
            );
          })}
        </div>

        <button
          type="button"
          onClick={() => {
            append({ name: "append" });
          }}
        >
          append
        </button>
        <button
          type="button"
          onClick={() => {
            prepend({ name: "prepend" });
          }}
        >
          prepend
        </button>

        <button onClick={() => reset()} disabled={!isDirty || isSubmitting}>
          Reset
        </button>
        <input type="submit" />
      </form>
    </>
  );
}

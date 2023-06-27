"use client";

import Modal from "@/app/conversations/[conversationId]/Modal";
import {User} from "@prisma/client";
import axios from "axios";
import {useRouter} from "next/navigation";
import {useState} from "react";
import {FieldValues, SubmitHandler, useForm} from "react-hook-form";
import {toast} from "react-hot-toast";
import Input from "./Input";
import Image from "next/image";
import {CldUploadButton} from "next-cloudinary";
import Button from "./Button";

type Props = {
  currentUser?: User | null;
  isOpen: boolean;
  onClose: () => void;
};
function SettingsModal({currentUser, isOpen, onClose}: Props) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,

    watch,
    formState: {errors},
    setValue,
  } = useForm<FieldValues>({
    defaultValues: {
      name: currentUser?.name,
      image: currentUser?.image,
    },
  });
  const image = watch("image");

  const handleUpload = (result: any) => {
    setValue("image", result?.info?.secure_url, {
      shouldValidate: true,
    });
  };

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);

    setIsLoading(false);
    axios
      .post(`/api/settings`, data)
      .then(() => {
        router.refresh();
        onClose();
      })
      .catch(() => toast.error(`Something went wrong`))
      .finally(() => setIsLoading(false));
  };
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="space-y-12">
          <div className="border-b border-gray-900/10 pb-12">
            <h2 className="text-base font-semibold leading-7 text-gray-900">
              Profile
            </h2>
            <p className="mt-1 text-sm text-gray-600 leading-6">
              Edit your profile information and be sure to update your profile
              picture.
            </p>
            <div className="mt-10 flex flex-col gap-y-8">
              <Input
                disabled={isLoading}
                label="Name"
                id="name"
                errors={errors}
                required
                register={register}
              />
              <div>
                <label
                  htmlFor="photo"
                  className="block text-sm font-medium text-gray-900 leading-6"
                >
                  Photo
                </label>
                <div className="mt-2 flex items-center gap-x-3">
                  <Image
                    src={
                      image ||
                      currentUser?.image ||
                      `https://ui-avatars.com/api/?name=${currentUser?.name}`
                    }
                    width={50}
                    height={50}
                    className="rounded-full object-cover h-16 w-16"
                    alt="avatar"
                  />

                  <CldUploadButton
                    options={{
                      maxFiles: 1,
                    }}
                    onUpload={handleUpload}
                    uploadPreset="ww1dyjv5"
                  >
                    <Button disabled={isLoading} type="button" secondary>
                      Change
                    </Button>
                  </CldUploadButton>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-6 flex items-center justify-end gap-x-6">
            <Button secondary onClick={onClose} disabled={isLoading}>
              Cancel
            </Button>

            <Button type="submit" disabled={isLoading}>
              Save
            </Button>
          </div>
        </div>
      </form>
    </Modal>
  );
}

export default SettingsModal;

import Image from "next/image";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { Button, Input, Loader } from "../components";
import { useFormik } from "formik";
import { createCampaignSchema } from "../validation/createCampaignVal";
import { ChangeEvent, useEffect, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import userUser from "../app/slices/userSlice/userUser";
import { useRouter } from "next/router";
import UploadIpfs from "../services/UploadIpfs.service";
import { toast } from "react-toastify";
import { getCrowdFundingContractSigned } from "../utils/getCrowdFundingContract";
import DatabaseService from "../services/Db.service";

let eth: any = null;

if (typeof window !== "undefined") {
  const mywindow: any = window;
  eth = mywindow.ethereum;
}

interface ICreateCampaignState {
  title: string;
  story: string;
  name: string;
  amount: string;
  websiteURL?: string;
}

const useCreateCampaign = () => {
  const initState: ICreateCampaignState = {
    title: "",
    story: "",
    name: "",
    amount: "",
    websiteURL: "",
  };

  const [image, setImage] = useState<File | null>(null);
  const [endDate, setEndDate] = useState<string>("");
  const [loading, setLoading] = useState<string | undefined>();

  const { handleChange, values, errors, handleSubmit } =
    useFormik<ICreateCampaignState>({
      initialValues: initState,
      onSubmit: (values) => createCamapaign(values),
      validationSchema: createCampaignSchema,
    });

  const listenEvent = () => {
    const contract = getCrowdFundingContractSigned(eth);
    contract.on(
      "campaignCreated",
      async (target, startAt, endAt, dataURI, address) => {
        const db = new DatabaseService();
        const data = {
          target: target.toString(),
          startAt: startAt.toString(),
          endAt: endAt.toString(),
          dataURL: dataURI,
          address,
        };
        const { error } = await db.superbase
          .from("campaigns")
          .upsert({ ...data }, { onConflict: "address" });
        console.log(error);
        toast.success("Campaign created successfully!");
      }
    );
  };

  const createCamapaign = async (values: ICreateCampaignState) => {
    // validate image
    if (!image) {
      toast.error("Please choose image!");
      return;
    }

    // validate the end date
    const endingDate = new Date(endDate);
    if (endingDate.getTime() <= Date.now()) {
      toast.error("The ending date should be in future!");
      return;
    }

    setLoading(
      "Uploading the meta data to IPFS please wait this might take time depending upon your network speed..."
    );

    // upload file to ipfs
    const uploadService = new UploadIpfs();
    const imagePath = await uploadService.uploadFile(image);

    const dataPath = await uploadService.uploadJson({
      ...values,
      imageURL: imagePath,
    });

    setLoading("Waiting for confiming transaction from wallet...");

    if (!eth)
      return toast.warning(
        "No wallet found please try again by reloading the window!"
      );

    const contract = getCrowdFundingContractSigned(eth);
    const tx = await contract.createCampaign(
      Number(values.amount),
      Date.now(),
      new Date(endDate).getTime(),
      dataPath
    );
    await tx.wait();
    setLoading(undefined);
    listenEvent();
  };

  const handleImage = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;
    const file = files[0];
    setImage(file);
  };

  const handleSetEndDate = (event: ChangeEvent<HTMLInputElement>): void => {
    setEndDate(event.target.value);
  };

  const clearImage = () => setImage(null);

  return {
    handleChange,
    values,
    errors,
    handleSubmit,
    image,
    handleImage,
    clearImage,
    handleSetEndDate,
    endDate,
    loading,
  };
};

export default function CreateCampaign() {
  const {
    handleChange,
    values,
    errors,
    handleSubmit,
    image,
    handleImage,
    clearImage,
    endDate,
    handleSetEndDate,
    loading,
  } = useCreateCampaign();
  const { isLoggedIn } = userUser();
  const router = useRouter();

  useEffect(() => {
    if (!isLoggedIn) {
      router.push("/campaigns");
    }
  }, [isLoggedIn]);

  return (
    <>
      <section className="pt-[5rem] pb-8">
        <h1 className="text-2xl font-nato font-bold">
          Start Your Campaign 🚀🚀
        </h1>
        <form onSubmit={handleSubmit} action="" className="mt-8">
          <Input
            title="Campagin title"
            value={values.title}
            type="text"
            onChange={handleChange}
            name="title"
            error={errors.title}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-4">
            <div className="">
              <label htmlFor="" className="font-nato">
                Story
              </label>
              <small className="block mt-1 font-nato font-light">
                Note that story should be engaging so that funders can invest in
                your campagin
              </small>
              <textarea
                value={values.story}
                onChange={handleChange}
                name="story"
                className="bg-gray-100 dark:bg-gray-700 min-h-[250px] resize-none rounded-md font-nato px-2 mt-2 py-3 w-full outline-none"
              />
              {errors.story && (
                <small className="mt-1 text-[0.75rem] font-nato font-light text-red-400">
                  {errors.story}
                </small>
              )}
            </div>

            {image ? (
              <div className="relative h-[300px] md:h-full w-full rounded-lg overflow-hidden">
                <Image
                  src={URL.createObjectURL(image)}
                  alt=""
                  fill
                  className="object-cover"
                />
                <div
                  onClick={() => clearImage()}
                  className="absolute cursor-pointer bg-gray-500 rounded-full p-1 top-1 right-1"
                >
                  <AiOutlineClose className="text-xl text-white" />
                </div>
              </div>
            ) : (
              <div className="w-full h-full flex items-center justify-center flex-col">
                <label htmlFor="file">
                  <div className="hover:text-primary flex items-center justify-center flex-col cursor-pointer transition">
                    <AiOutlineCloudUpload className="text-5xl" />
                    <span className="mt-2 font-nato">
                      Upload image for campaign
                    </span>
                  </div>
                  <input
                    type="file"
                    accept="image/png,image/jpeg,image/jpg"
                    onChange={handleImage}
                    className="hidden"
                    id="file"
                  />
                </label>
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Input
              title="Creator name"
              value={values.name}
              type="text"
              onChange={handleChange}
              name="name"
              error={errors.name}
            />

            <Input
              title="Amount to be raised(ETH)"
              value={values.amount}
              type="number"
              onChange={handleChange}
              name="amount"
              error={errors.amount}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Input
              title="End date"
              value={endDate}
              type="date"
              onChange={handleSetEndDate}
              name="endDaate"
            />

            <Input
              title="Website URL(Optional)"
              value={values.websiteURL}
              type="text"
              onChange={handleChange}
              name="websiteURL"
              error={errors.websiteURL}
            />
          </div>

          <div className="">
            <Button
              type="submit"
              title="Start a campaign"
              className="px-2 py-3 w-full md:w-fit"
            />
          </div>
        </form>
      </section>

      {loading && <Loader message={loading} />}
    </>
  );
}

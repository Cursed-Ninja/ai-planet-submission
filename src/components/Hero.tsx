import React from "react";
import Image from "next/image";
import HeroImage from "../assets/Hand holding bulb 3D.png";
import { useRouter } from "next/router";

const Hero = () => {
  const router = useRouter();
  return (
    <div className="h-[500px] bg-[#003145] flex space-between px-[100px] py-[80px] gap-[150px] bg-[url(/waves.png)] bg-no-repeat bg-bottom">
      <div className="text-white w-[65%] text-justify flex flex-col justify-center items-start">
        <h3 className="text-4xl font-semibold">Hackathon Submission</h3>
        <br />
        <p>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quibusdam
          ratione inventore expedita facere, assumenda veniam eum tempore porro
          hic. Commodi repellendus laudantium praesentium nemo dicta eum
          similique officia natus sequi impedit molestiae earum tempore enim
          quasi sapiente facilis iusto quia, quo, maiores nulla est dolor illum
          repellat. Officia, eaque optio!
        </p>
        <br />
        <button
          className="bg-[#44924C] px-4 py-2 rounded-lg font-semibold"
          onClick={() => router.push("/upload")}
        >
          Upload Submission
        </button>
      </div>
      <div>
        <Image src={HeroImage} alt="Hero" height="300" />
      </div>
    </div>
  );
};

export default Hero;

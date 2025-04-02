import { Image } from "antd";
import LogoImg from "../assets/logo.png";

export default function Logo(props) {
  return (
    <>
      <Image
        src={LogoImg}
        alt="logo"
        loading="lazy"
        preview={false}
        width={156}
        height={52}
        {...props}
      />
    </>
  );
}

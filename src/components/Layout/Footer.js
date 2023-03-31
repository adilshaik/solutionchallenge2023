import { useRouter } from "next/router";

export const Footer = () => {
  const router = useRouter();
  if (
    router.pathname.split("/").indexOf("auth") !== -1 ||
    (router.pathname.split("/")[3] === "resumes" && router.pathname.split("/")[4] === "[id]") ||
    router.pathname.indexOf("viewresume") !== -1 ||
    router.pathname.indexOf("/dashboard/college/students") !== -1
  )
    return <></>;

  return (
    <footer className='bg-gray-900'>
        <p className='py-4 text-center text-base text-white'>
          &copy; 2023 Provast, Inc. All rights reserved.
        </p>
    </footer>
  );
};

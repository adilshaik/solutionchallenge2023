import { NextSeo } from "next-seo";
import { About } from "../src/components/Landing/About";
import { CTA } from "../src/components/Landing/CTA";
import { Guide } from "../src/components/Landing/Guide";
import { Slider } from "../src/components/Landing/Slider";
import { getLoginSession } from "../src/lib/auth";
import { findUser } from "../src/lib/user";

const Index = () => {
  return (
    <>
      <NextSeo
        title='Provast'
        description='This example uses more of the available config options.'
        canonical='/provast_black.png'
        openGraph={{
          url: "/provast_black.png",
          title: "Open Graph Title",
          description: "Open Graph Description",
          images: [
            {
              url: "/provast_black.png",
              width: 800,
              height: 600,
              alt: "Og Image Alt",
              type: "image/jpeg",
            },
            {
              url: "/provast_black.png",
              width: 900,
              height: 800,
              alt: "Og Image Alt Second",
              type: "image/jpeg",
            },
            {
              url: "/provast_black.png",
            },
            {
              url: "/provast_black.png",
            },
          ],
          site_name: "Vast",
        }}
        twitter={{
          handle: "@handle",
          site: "@site",
          cardType: "summary_large_image",
        }}
      />

      <main className='pt-[10vh] mb-10'>
        <Slider />
        <Guide />
        <CTA />
        <About />
      </main>
    </>
  );
};

export const getServerSideProps = async ({ req, res, query }) => {
  const session = await getLoginSession(req);
  const user = (session?._doc && (await findUser(session._doc))) ?? null;

  if (user && !user.detailsAvailable) {
    return {
      redirect: {
        destination: "/auth/user/details",
        permanent: false,
      },
    };
  }

  if (user?.category === "student" && !user?.academicsAvailable) {
    return {
      redirect: {
        destination: "/auth/user/academics",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};

export default Index;

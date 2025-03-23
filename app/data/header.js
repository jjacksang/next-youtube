import { CiBaseball } from "react-icons/ci";
import { CiCoins1 } from "react-icons/ci";
import { SiYoutubeshorts } from "react-icons/si";

import { SiVelog } from "react-icons/si";
import { AiFillGithub } from "react-icons/ai";
import { AiOutlineInstagram } from "react-icons/ai";

export const headerMenus = [
    {
        title: "Home",
        icon: <CiBaseball />,
        src: "/",
    },
    {
        title: "Shorts",
        icon: <SiYoutubeshorts />,
        src: "/shorts",
    },
    {
        title: "추천 개발자",
        icon: <CiCoins1 />,
        src: "/developer",
    },
];

export const searchKeyword = [
    {
        title: "HTML",
        src: "/search/html",
    },
    {
        title: "CSS",
        src: "/search/css",
    },
    {
        title: "JavaScript",
        src: "/search/javascript",
    },
    {
        title: "React.js",
        src: "/search/react.js",
    },
    {
        title: "Vue.js",
        src: "/search/vue.js",
    },
    {
        title: "Next.js",
        src: "/search/next.js",
    },
    {
        title: "Node.js",
        src: "/search/node.js",
    },
    {
        title: "SQL",
        src: "/search/sql",
    },
    {
        title: "portfolio",
        src: "/search/React Portfolio",
    },
    {
        title: "music",
        src: "/search/NewJeans",
    },
];

export const snsLink = [
    {
        title: "github",
        url: "https://github.com/jjacksang/next-youtube",
        icon: <AiFillGithub />,
    },
    {
        title: "youtube",
        url: "https://velog.io/@jjacksang/posts",
        icon: <SiVelog />,
    },
    {
        title: "instagram",
        url: "https://www.instagram.com/ban_ko.1/",
        icon: <AiOutlineInstagram />,
    },
];

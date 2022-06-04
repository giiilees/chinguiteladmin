import {
  IoNotificationsSharp,
  IoSettings,
  IoSettingsOutline,
  IoWallet,
} from "react-icons/io5";
import { IoIosContacts } from "react-icons/io";
import { AiFillCreditCard, AiOutlineDollar } from "react-icons/ai";
import { GrHomeOption, GrTransaction } from "react-icons/gr";
import { FiActivity, FiUsers } from "react-icons/fi";
import {
  RiBankCardFill,
  RiFileList2Fill,
  RiHomeSmile2Line,
  RiInboxFill,
  RiSendPlaneFill,
  RiSendPlaneLine,
  RiShoppingBag3Fill,
  RiUser4Line,
  RiUserReceivedLine,
  RiUserSmileFill,
  RiWallet3Fill,
} from "react-icons/ri";
import { HiMenuAlt3, HiOutlineCode, HiUsers } from "react-icons/hi";

import Colors from "./Colors";
import { FaMoneyCheckAlt, FaUsers } from "react-icons/fa";
import { CgShoppingBag } from "react-icons/cg";
import { MdOutlineFeaturedPlayList } from "react-icons/md";

const NavItems = {
  main: [
    {
      name: "Accueil",
      href: "/",
    },
    {
      name: "Particuliers      ",
      href: "/individual",
    },

    {
      name: "Entreprise",
      href: "/entreprise",
    },

    {
      name: "Qui somme nous ?",
      href: "/about",
    },

    {
      name: "Services",
      href: "/shop",
    },
    {
      name: "Recharge",
      href: "/recharge",
    },
    // {
    //   mobOnly: false,
    //   name: "Paramètres",
    //   href: "/settings",
    //   icon: HiMenuAlt3,
    //   isIcon: true,
    //   activeColor: "blue",
    //   color: "rgba(0,0,0,0.6)",
    //   size: "24px",
    // },
  ],
  menu: [
    {
      name: "Accueil",
      href: "/",
      icon: GrHomeOption,
      size: 23,
    },
    {
      name: "Commandes",
      href: "/orders",
      icon: RiUser4Line,
      size: 23,
    },
    {
      name: "Services",
      href: "/shop",
      icon: MdOutlineFeaturedPlayList,
      size: 23,
      children: [{ name: "Tout les services", href: "/shop" }],
    },
    {
      name: "Boîte de réception",
      href: "/request",
      icon: MdOutlineFeaturedPlayList,
      size: 23,
    },
    {
      name: "Réglages",
      href: "/menu/profile",
      icon: IoSettingsOutline,
      size: 23,
      children: [
        { name: "Profile", href: "/menu/profile" },
        { name: "Sécurité", href: "/menu/security" },
      ],
    },
  ],
  send: [
    {
      name: "Email",
      href: "/send/email",
    },
    {
      name: "Wallet",
      href: "/send/wallet",
    },
    {
      name: "Bank",
      href: "/send/bank",
    },
  ],
};

export default NavItems;


import {IconDefinition } from "@fortawesome/fontawesome-svg-core";
import {
  faHamburger,
  faShoppingCart,
  faHome,
  faLightbulb,
  faCar,
  faUser,
  faTshirt,
  faFilm,
  faPlane,
  faGift,
  faBriefcaseMedical,
  faHospital,
  faGraduationCap,
  faTools,
  faMoneyBill,
} from "@fortawesome/free-solid-svg-icons";

interface CategoryIcons {
  [category: string]: {
    icon: IconDefinition;
    backgroundColor: string;
  };
}


export const categoryIconMap:CategoryIcons = {
  "Food and Drinks": {
    icon: faHamburger,
    backgroundColor: "#FFB900",
  },
  Groceries: {
    icon: faShoppingCart,
    backgroundColor: "#FF8C00",
  },
  "Rent or Mortgage": {
    icon: faHome,
    backgroundColor: "#F7630C",
  },
  Utilities: {
    icon: faLightbulb,
    backgroundColor: "#CA5010",
  },
  Transportation: {
    icon: faCar,
    backgroundColor: "#DA3B01",
  },
  "Personal care": {
    icon: faUser,
    backgroundColor: "#EF6950",
  },
  "Clothing and Accessories": {
    icon: faTshirt,
    backgroundColor: "#D13438",
  },
  Entertainment: {
    icon: faFilm,
    backgroundColor: "#9A0089",
  },
  Travel: {
    icon: faPlane,
    backgroundColor: "#881798",
  },
  "Gifts and Donations": {
    icon: faGift,
    backgroundColor: "#0050EF",
  },
  "Medical and Health": {
    icon: faBriefcaseMedical,
    backgroundColor: "#6BBA70",
  },
  Insurance: {
    icon: faHospital,
    backgroundColor: "#00B294",
  },
  Education: {
    icon: faGraduationCap,
    backgroundColor: "#018574",
  },
  "Home Maintenance and Repairs": {
    icon: faTools,
    backgroundColor: "#486860",
  },
  Miscellaneous: {
    icon: faMoneyBill,
    backgroundColor: "#7E7E7E",
  },
};
import { image, title } from "framer-motion/client";
import fallout from "../../assets/fallout.jpg";
import fallout2 from "../../assets/fallout2.jpg";
import inside from "../../assets/inside.jpg";
import inside2 from "../../assets/inside2.jpeg";
import BreakingBad from "../../assets/BreakingBad.jpg";
import BreakingBad2 from "../../assets/BreakingBad2.jpg";
import GameOfThrones from "../../assets/GameOfThrones.jpg";
import GameOfThrones2 from "../../assets/GameOfThrones2.jpg";
import PeakyBlinders from "../../assets/PeakyBlinders.jpg";
import PeakyBlinders2 from "../../assets/PeakyBlinders2.jpg";
import SocialNetwork from "../../assets/SocialNetwork.jpeg";
import Inception from "../../assets/Inception.jpeg";
import DarkKnight from "../../assets/DarkKnight.jpeg";
import SpiderMan from "../../assets/SpiderMan.jpeg";
import Interstellar from "../../assets/Interstellar.jpeg";  
import LordOfTheRings from "../../assets/LordOfTheRings.jpeg";
import Dark from "../../assets/Dark.jpeg"
import Harry from "../../assets/Harry.jpeg"
import Endgame from "../../assets/Endgame.jpeg"

// Video Data for trailers, thumbnails, and other details
export const VideoData = [
  {
    id: 1,
    thumbnail: fallout2,
    poster: fallout,
    title: "Welcome to the Apocalypse!",
    subtitle: 'Watch the new "Fallout" Trailer',
    duration: "3:18",
    playIcon:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/b5623966370f8a13419d3bd9c6106bd5cd938834b64431ce46c38ddee00c095a?placeholderIfAbsent=true&apiKey=3953249e405f4f0f9fc1a18498c625c2",
  },
  {
    id: 2,
    thumbnail:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/c56c9c766d58999466858012cef2b32a4f9a8868157d1bf020c23d8194557d81?placeholderIfAbsent=true&apiKey=3953249e405f4f0f9fc1a18498c625c2",
    poster:
      "https://upload.wikimedia.org/wikipedia/en/f/f7/Inside_Out_2_poster.jpg",
    title: "'Inside Out 2' Make us Feel Every Emotion",
    subtitle: 'Watch the new "Inside Out 2" Trailer',
    duration: "3:18",
    playIcon:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/a236731649ff73e78d0c1de2431213995567da5fbab2fc6da869c842e98ba4a1?placeholderIfAbsent=true&apiKey=3953249e405f4f0f9fc1a18498c625c2",
  },
  {
    id: 3,
    thumbnail:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/fb260b4b7be05803548f9c35eaed86e258231605afd1a57ec2b16c5e91aab79c?placeholderIfAbsent=true&apiKey=3953249e405f4f0f9fc1a18498c625c2",
    poster:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/2e91e48da63e11259b273518d1c998c5f7d0efe921e3abf2e1a77cad9b20be2f?placeholderIfAbsent=true&apiKey=3953249e405f4f0f9fc1a18498c625c2",
    title: "Where Might 'Dune' Go Next?",
    subtitle: "Our 'Dune: Part Three' Theories",
    duration: "3:18",
    playIcon:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/594adf582d79810aed749deabd13b2b8c545088331b5446fb8225c5eb9fb1776?placeholderIfAbsent=true&apiKey=3953249e405f4f0f9fc1a18498c625c2",
  },
];

// Featured Videos for the main section
export const FeaturedMovies = [
  {
    id: 1,
    title: "Inside Out 2",
    image: inside,
  },
  {
    id: 2,
    title: "Fallout",
    image: fallout2,
  },
  {
    id: 3,
    title: "Breaking Bad",
    image: BreakingBad,
  },
  {
    id: 4,
    title: "Game of Thrones",
    image: GameOfThrones,
  },
  {
    id: 5,
    title: "Peaky Blinders",
    image: PeakyBlinders,
  },
];

export const FeaturedMovieCard = [
  {
    id: 1,
    title: "Inside Out 2",
    subtitle: 'Watch the new "Inside Out 2" Trailer',
    image: inside2,
  },
  {
    id: 2,
    title: "Fallout",
    subtitle: 'Watch the new "Fallout" Trailer',
    image: fallout,
  },
  {
    id: 3,
    title: "Breaking Bad",
    subtitle:
      "A chemistry teacher diagnosed with inoperable lung cancer turns to manufacturing and selling methamphetamine with a former student to secure his family's future.",
    image: BreakingBad2,
  },
  {
    id: 4,
    title: "Game of Thrones",
    subtitle:
      "Nine noble families fight for control over the lands of Westeros, while an ancient enemy returns after being dormant for millennia.",
    image: GameOfThrones2,
  },
  {
    id: 5,
    title: "Peaky Blinders",
    subtitle:
      "A gangster family epic set in 1919 Birmingham, England; centered on a gang who sew razor blades in the peaks of their caps, and their fierce boss Tommy Shelby.",
    image: PeakyBlinders2,
  },
];

const TopPicksCard = [
  {
    title: "The Social Network",
    posterSrc:
    SocialNetwork,
    rating: 8.7,
  },
  {
    title: "Inception",
    posterSrc:
    Inception,
    rating: 8.8,
  },
  {
    title: "The Dark Knight",
    posterSrc:
      DarkKnight,
    rating: 9.0,
  },
  {
    title: "Spider Man Across Spider Verse",
    posterSrc:
      SpiderMan,
    rating: 9.0,
  },
  {
    title: "Interstellar",
    posterSrc:
      Interstellar,
    rating: 9.0,
  },
  {
    title: "The Lord Of The Rings",
    posterSrc:
      LordOfTheRings,
    rating: 9.0,
  },
  {
    title: "Breakin Bad",
    posterSrc:
      BreakingBad2,
    rating: 9.8,
  },
  {
    title: "Peaky Blinders",
    posterSrc:
      PeakyBlinders2,
    rating: 9.2,
  },
  {
    title: "Inside Out",
    posterSrc:
      inside,
    rating: 9.0,
  },
  {
    title: "Dark",
    posterSrc:
      Dark,
    rating: 9.0,
  },
  {
    title: "Harry Potter And The Prisoner Of Azkban",
    posterSrc:
      Harry,
    rating: 9.0,
  },
  {
    title: "Avengers Endgame",
    posterSrc:
      Endgame,
    rating: 9.0,
  },
];

export default TopPicksCard;
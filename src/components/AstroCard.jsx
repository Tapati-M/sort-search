import React, { useState } from "react";
import { pramukh, manoj, rudrakh } from "../assets";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

const AstroCard = () => {
  const astrologersData = [
    {
      avatar: manoj,
      name: "Sri. Manoj Sastri",
      expertise: "Vedic, Numerology",
      languages: "Beng., Eng., Hindi",
      experience: 8, // Changed to number for sorting
      rate: 21, // Changed to number for sorting
      button: "Call Now",
      rating: 5,
      chatLink: "https://t.ly/cMnKn",
      phone: "+91 8240060110",
    },
    {
      avatar: pramukh,
      name: "Pramukh Sastri",
      expertise: "Vastu, Vedic",
      languages: "Beng., Eng., Hindi",
      experience: 7,
      rate: 31,
      button: "Call Now",
      rating: 4.5,
      chatLink: "https://wa.me/qr/L4VRGA5WDFCZC1",
      phone: "+91 7001492922",
    },
    {
      avatar: rudrakh,
      name: "Sri.Rudraksh Sastri",
      expertise: "Life Coach, Numerology",
      languages: "Beng., Eng., Hindi",
      experience: 6,
      rate: 17,
      button: "Call Now",
      rating: 4,
      chatLink: "https://example-chat-url.com/rudrakh",
      phone: "+1122334455",
    },
  ];

  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState("");
  const [astrologers, setAstrologers] = useState(astrologersData);

  // Function to handle sorting
  const handleSort = (option) => {
    setSortOption(option);
    const sortedAstrologers = [...astrologers].sort((a, b) => {
      if (option === "name") return a.name.localeCompare(b.name);
      if (option === "experience") return b.experience - a.experience;
      if (option === "rate") return a.rate - b.rate;
      return 0;
    });
    setAstrologers(sortedAstrologers);
  };

  // Function to handle searching
  const handleSearch = (query) => {
    setSearchQuery(query);
    const filteredAstrologers = astrologersData.filter((astrologer) =>
      astrologer.name.toLowerCase().includes(query.toLowerCase())
    );
    setAstrologers(filteredAstrologers);
  };

  // Star rendering logic remains the same
  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 !== 0;
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

    for (let i = 0; i < fullStars; i++) {
      stars.push(<FaStar key={`full-${i}`} />);
    }
    if (halfStar) {
      stars.push(<FaStarHalfAlt key="half" />);
    }
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<FaRegStar key={`empty-${i}`} />);
    }

    return stars;
  };

  const handleChat = (chatLink) => {
    window.open(chatLink, "_blank");
  };
  const handleCall = (phone) => {
    window.open(`tel:${phone}`, "_self");
  };

  return (
    <div className="bg-gray-50 py-8 px-4 md:px-6 lg:px-16">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Consult Astrologer</h1>
        <button className="bg-yellow-400 text-black px-4 py-2 rounded font-semibold">
          Chat / Talk to Our Experts
        </button>
      </div>

      {/* Search and Sort Section */}
      <div className="flex items-center gap-4 mb-6">
        {/* Sort Dropdown */}
        <select
          value={sortOption}
          onChange={(e) => handleSort(e.target.value)}
          className="border border-gray-300 rounded px-2 py-1"
        >
          <option value="">Sort</option>
          <option value="name">Sort by Name</option>
          <option value="experience">Sort by Experience</option>
          <option value="rate">Sort by Rate</option>
        </select>

        {/* Search Input */}
        <input
          type="text"
          placeholder="Search by Name"
          value={searchQuery}
          onChange={(e) => handleSearch(e.target.value)}
          className="border border-gray-300 rounded px-3 py-2 w-64"
        />
      </div>

      {/* Astrologer Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {astrologers.map((astrologer, index) => (
          <div
            key={index}
            className="bg-pink-200 border rounded-lg shadow-md p-4 hover:bg-pink-300 transition duration-300 ease-in-out"
          >
            {/* Avatar */}
            <div className="w-16 h-16 mx-auto bg-gray-200 rounded-full overflow-hidden">
              <img
                src={astrologer.avatar}
                alt={`${astrologer.name} Avatar`}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Name */}
            <h3 className="text-center text-sm font-bold mt-4">
              {astrologer.name}
            </h3>

            {/* Ratings */}
            <div className="flex justify-center items-center text-yellow-500 mt-2">
              {renderStars(astrologer.rating)}
            </div>

            {/* Details */}
            <p className="text-gray-600 text-xs text-center mt-1">
              {astrologer.expertise}
            </p>
            <p className="text-gray-600 text-xs text-center mt-1">
              {astrologer.languages}
            </p>
            <p className="text-gray-500 text-xs text-center mt-1">
              Exp: {astrologer.experience} Years
            </p>
            <p className="text-black font-semibold text-center mt-2">
              ₹ {astrologer.rate}/min
            </p>

            {/* Buttons */}
            <div className="mt-4 flex justify-center space-x-2">
              <button
                onClick={() => handleChat(astrologer.chatLink)}
                className="bg-yellow-500 hover:bg-yellow-600 text-white py-1 px-2 text-xs rounded"
              >
                Chat
              </button>
              <button
                onClick={() => handleCall(astrologer.phone)}
                className="bg-blue-500 hover:bg-blue-600 text-white py-1 px-2 text-xs rounded"
              >
                Call
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AstroCard;

import { Box, InputGroup, InputLeftElement, Input } from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import { motion } from "framer-motion";
import { fadeInUp, stagger } from "../motion";
import React, { useState, useEffect } from "react";
import { Api } from "../API/Api";
import "../Global.css";
import SkeletonCard from "./SkeletonCard";
import ImageModal from "./ImageModal";

export default function HomePage() {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("africa");
  const [loading, setLoading] = useState(false);
  const [modalData, setModalData] = useState(null);

  useEffect(() => {
    if (!search) return;
    setLoading(true);
    const timer = setTimeout(() => {
      Api(search).then((data) => {
        setData(data.results);
        setLoading(false);
      });
    }, 2500);
    return () => clearTimeout(timer);
  }, [search]);

  const handleChange = (event) => {
    setSearch(event.target.value);
    console.log("search here: ", event.target.value);
  };

  return (
    <main>
      <Box bg="#D3D3D3" w="100%" p={20}>
        <InputGroup>
          <InputLeftElement
            top="11px"
            pointerEvents="none"
            children={<SearchIcon color="gray.300" />}
            fontSize="lg"
          />

          <Input
            id="inpo"
            onChange={handleChange}
            className="noHover"
            height="60px"
            backgroundColor="white"
            color="black"
            type="search"
            placeholder="Search for photo"
          />
        </InputGroup>
        {/* {loading && <h3>Searching for {search}</h3>}
        {!loading && <h3>Results for {search}</h3>} */}
      </Box>

      {loading && <SkeletonCard />}
      {!loading && (
        <section>
          <motion.div
            exit={{ opacity: 0 }}
            initial="initial"
            animate="animate"
            className="grid-container"
          >
            <motion.div variants={stagger}>
              {data.map((data, index) => (
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  variants={fadeInUp}
                  key={index}
                  className="grid-item"
                >
                  <motion.img
                    initial={{ x: 60, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    src={data.urls.small}
                    alt={data.alt_description}
                    onClick={() => setModalData(data)}
                    className="img-collection"
                  />
                  <motion.div
                    initial={{ x: 60, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.6 }}
                    className="overlay-text"
                  >
                    <h6>{data.user.name}</h6>
                    <small>{data.user.location}</small>
                  </motion.div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </section>
      )}
      <ImageModal
        isOpen={modalData ? true : false}
        onClose={() => setModalData(null)}
        modalData={modalData}
      />
    </main>
  );
}

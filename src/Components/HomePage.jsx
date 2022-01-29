import { Box, InputGroup, InputLeftElement, Input } from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import { motion } from "framer-motion";
import { fadeInUp, stagger } from "../motion";
import React, { useState, useEffect } from "react";
import { Api } from "../API/Api";
import "../Global.css";

import SkeletonCard from "./SkeletonCard";

export default function HomePage() {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("africa");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!search) return;
    Api(search).then((data) => {
      console.log("What is data: ", data.results);
      setData(data.results);
      setLoading(false);
    });
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
    </main>
  );
}

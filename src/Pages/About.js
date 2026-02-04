import React from "react";
import Layout from "./../components/Layout/Layout";

const About = () => {
  const styles = {
    container: {
      padding: "40px 20px",
      display: "flex",
      flexWrap: "wrap",
      alignItems: "center",
      justifyContent: "center",
    },
    imageWrapper: {
      flex: "1 1 45%",
      margin: "10px",
      overflow: "hidden",
      borderRadius: "12px",
      boxShadow: "0px 5px 15px rgba(0,0,0,0.1)",
      transition: "transform 0.4s ease, box-shadow 0.4s ease",
    },
    image: {
      width: "100%",
      height: "auto",
      display: "block",
    },
    textWrapper: {
      flex: "1 1 45%",
      margin: "10px",
      padding: "20px",
    },
    heading: {
      fontSize: "2rem",
      fontWeight: "bold",
      marginBottom: "15px",
      color: "#222",
    },
    paragraph: {
      fontSize: "1.1rem",
      lineHeight: "1.7",
      marginBottom: "15px",
      color: "#555",
    },
    highlight: {
      color: "#ff6600", // Amazon-like accent
      fontWeight: "600",
    },
  };

  return (
    <Layout title={"About Us - HaveAriz"}>
      <div style={styles.container}>
        {/* Image Section */}
        <div
          style={styles.imageWrapper}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "scale(1.05)";
            e.currentTarget.style.boxShadow =
              "0px 8px 25px rgba(0,0,0,0.2)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "scale(1)";
            e.currentTarget.style.boxShadow =
              "0px 5px 15px rgba(0,0,0,0.1)";
          }}
        >
          <img
            src="/images/About.png"
            alt="About"
            style={styles.image}
          />
        </div>

        {/* Text Section */}
        <div style={styles.textWrapper}>
          <h2 style={styles.heading}>Who We Are</h2>
          <p style={styles.paragraph}>
            Welcome to <strong>HaveAriz</strong> – your one-stop destination
            for shopping everything you love! Our mission is to make online
            shopping <span style={styles.highlight}>simple, secure, and enjoyable</span>.
          </p>
          <p style={styles.paragraph}>
            We bring together a wide range of products at the best prices,
            ensuring <span style={styles.highlight}>quality and convenience</span>{" "}
            at your fingertips. Whether it’s the latest fashion, electronics,
            or everyday essentials – we’ve got you covered.
          </p>
          <p style={styles.paragraph}>
            With a passionate team of tech enthusiasts, we’re constantly
            working to deliver a <span style={styles.highlight}>seamless shopping
            experience</span> that feels personal and reliable.
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default About;

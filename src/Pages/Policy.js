import React from "react";
import Layout from "./../components/Layout/Layout";

const Policy = () => {
  return (
    <Layout title={"Privacy Policy"}>
      <div className="row contactus" style={{ padding: "30px" }}>
        <div className="col-md-6">
          <img
            src="/images/privacy-policy.jpg"
            alt="privacy-policy"
            style={{
              width: "100%",
              borderRadius: "10px",
              boxShadow: "0px 4px 15px rgba(0,0,0,0.2)",
            }}
          />
        </div>

        <div className="col-md-6" style={{ lineHeight: "1.6" }}>
          <h2 style={{ marginBottom: "15px", color: "#ff6600" }}>
            Privacy Policy
          </h2>
          <p>
            At <strong>HaveAriz</strong>, we value your privacy. We only collect
            essential details like <strong>name, email, phone, and address</strong> 
            to process orders and provide better service.
          </p>
          <p>
            Your data is <strong>safe, secure, and never shared</strong> with
            third parties without your consent.
          </p>
          <p style={{ marginTop: "15px", fontWeight: "bold" }}>
            ✅ Shop worry-free. Your information is protected with us.
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default Policy;

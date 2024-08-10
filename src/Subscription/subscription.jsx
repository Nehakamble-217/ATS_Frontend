import React, { useEffect, useState } from "react";
import axios from "axios";
import "./subscription.css";
import AddUser from "./AddUser";

const SubscriptionPlans = () => {
  const [plans, setPlans] = useState([]);
  const [showPaymentForm, setShowPaymentForm] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [expandedPlanId, setExpandedPlanId] = useState(null); // State to manage expanded plan

  useEffect(() => {
    // Fetch subscription plans from the backend
    axios
      .get("http://93.127.199.85:9090/api/ats/157industries/fetchAllPlans")
      .then((response) => {
        setPlans(response.data);
      })
      .catch((error) => {
        console.error("Error fetching subscription plans:", error);
      });
  }, []);

  const togglePayment = (plan) => {
    setSelectedPlan(plan);
    setShowPaymentForm(true);
  };

  const toggleViewMore = (planId) => {
    setExpandedPlanId(expandedPlanId === planId ? null : planId); // Toggle expand/collapse
  };

  return (
    <div className="Container">
      {showPaymentForm ? (
        <AddUser selectedPlan={selectedPlan} />
      ) : (
        plans.map((plan, index) => (
          <div className="PlanCard" key={index}>
            {plan.popular && <div className="MostPopular">Most Popular</div>}
            <h2 className="PlanName">{plan.name}</h2>
            <div className="OldPrice">₹{plan.oldPrice}</div>
            <div className="Price">
              ₹{plan.price}/Month
              <span className="DiscountBadge">{plan.discount}</span>
            </div>
            <ul className="FeatureList">
              {plan.features.slice(0, 6).map((feature, idx) => (
                <li
                  className={`FeatureItem ${
                    feature.correct ? "correct" : "incorrect"
                  }`}
                  key={idx}
                >
                  {feature.name}
                </li>
              ))}
              {plan.features.length > 6 && (
                <>
                  {expandedPlanId === plan.id &&
                    plan.features.slice(6).map((feature, idx) => (
                      <li
                        className={`FeatureItem ${
                          feature.correct ? "correct" : "incorrect"
                        }`}
                        key={idx + 4}
                      >
                        {feature.name}
                      </li>
                    ))}
                  <span
                    className="ViewMore"
                    onClick={() => toggleViewMore(plan.id)}
                  >
                    {expandedPlanId === plan.id ? "View Less" : "View More"}
                  </span>
                </>
              )}
            </ul>
            <button
              className="Subscription-btn"
              onClick={() => togglePayment(plan)}
            >
              Choose Plan
            </button>
          </div>
        ))
      )}
    </div>
  );
};

export default SubscriptionPlans;

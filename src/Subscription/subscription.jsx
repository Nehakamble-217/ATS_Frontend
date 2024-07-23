import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "./subscription.css";
import AddUser from './AddUser';
// SwapnilRokade_NewSubscription_Page_Added_23/07

const SubscriptionPlans = () => {
  const [plans, setPlans] = useState([]);
  const [showPaymentForm, setShowPaymentForm] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);

  useEffect(() => {
    // Fetch subscription plans from the backend
    axios.get('http://localhost:8081/fetchAllPlans')
      .then(response => {
        setPlans(response.data);
      })
      .catch(error => {
        console.error('Error fetching subscription plans:', error);
      });
  }, []);

  const togglePayment = (plan) => {
    setSelectedPlan(plan);
    setShowPaymentForm(true);
  };

  return (
    <div className='Container'>
      {showPaymentForm ? (
        <AddUser selectedPlan={selectedPlan} />
      ) : (
        plans.map((plan, index) => (

          <div className='PlanCard' key={index}>
            {plan.popular && <div className='MostPopular'>Most Popular</div>}
            <h2 className='PlanName'>{plan.name}</h2>
            <div className='OldPrice'>₹{plan.oldPrice}</div>
            <div className='Price'>
            ₹{plan.price}/Month
              <span className='DiscountBadge'>{plan.discount}</span>
            </div>
            <ul className='FeatureList'>
              {plan.features.map((feature, idx) => (
                <li className={`FeatureItem ${feature.correct ? 'correct' : 'incorrect'}`} key={idx}>
                  {feature.name}
                </li>
              ))}
              <span>View More</span>
            </ul>
            <button className='Subscription-btn' onClick={() => togglePayment(plan)}>Choose Plan</button>
          </div>
        ))
      )}
    </div>
  );
};

export default SubscriptionPlans;

import React from 'react';
import "./subscription.css"



const plans = [
  {
    name: 'Silver',
    oldPrice: '₹1399.00',
    price: '₹1100.00/mo',
    discount: 'SAVE 82%',
    features: [
      { name: 'User wise report', correct: true },
      { name: 'Email Verification', correct: false },
      {name : 'Create JobDescription Video',correct: false },
      {name : 'Attendence Management',correct: true },
      {name : 'Upload multipal resume and create Excel',correct: false },
      {name : 'Add and Manage vendor',correct: false },
      {name : 'Profit and loss indicator',correct: false },
      {name : 'Templets for offer letter,termination etc',correct: true },
      {name : 'Recruiter Management System',correct: false },
      // Add more features
    ],
  },
  {
    name: 'Platinum',
    oldPrice: '₹2599.00',
    price: '₹2029.00/mo',
    discount: 'SAVE 78%',
 features: [
      { name: 'User wise report', correct: true },
      { name: 'Email Verification', correct: false },
      {name : 'Create JobDescription Video',correct: true },
      {name : 'Attendence Management',correct: true },
      {name : 'Upload multipal resume and create Excel',correct: false },
      {name : 'Add and Manage vendor',correct: true },
      {name : 'Profit and loss indicator',correct: false },
      {name : 'Templets for offer letter,termination etc',correct: true },
      {name : 'Recruiter Management System',correct: true },
      // Add more features
    ],
     mostPopular: true,
  },
  {
    name: 'Gold',
    oldPrice: '₹3399.00',
    price: '₹2949.00/mo',
    discount: 'SAVE 64%',
 features: [
      { name: 'User wise report', correct: true },
      { name: 'Email Verification', correct: false },
      {name : 'Create JobDescription Video',correct: true },
      {name : 'Attendence Management',correct: true },
      {name : 'Upload multipal resume and create Excel',correct: true },
      {name : 'Add and Manage vendor',correct: true },
      {name : 'Profit and loss indicator',correct: true },
      {name : 'Templets for offer letter,termination etc',correct: true },
      {name : 'Recruiter Management System',correct: false },
      // Add more features
    ],
    },
  {
    name: 'Diamond',
    oldPrice: '₹5999.00',
    price: '₹4699.00/mo',
    discount: 'SAVE 58%',
    features: [
      { name: 'User wise report', correct: true },
      { name: 'Email Verification', correct: true },
      {name : 'Create JobDescription Video',correct: true },
      {name : 'Attendence Management',correct: true },
      {name : 'Upload multipal resume and create Excel',correct: true },
      {name : 'Add and Manage vendor',correct: true },
      {name : 'Profit and loss indicator',correct: true },
      {name : 'Templets for offer letter,termination etc',correct: true },
      {name : 'Recruiter Management System',correct: true },
      // Add more features
    ],
  },
];

const SubscriptionPlans = ({togglePayment}) => (
  <div className='Container'>
     {plans.map((plan, index) => (
      <div className='PlanCard' key={index}>
        {plan.mostPopular && <div className='MostPopular'>Most Popular</div>}
        <h2 className='PlanName'>{plan.name}</h2>
        <div className='OldPrice'>{plan.oldPrice}</div>
        <div className='Price'>
          {plan.price}
          <span className='DiscountBadge'>{plan.discount}</span>
        </div>
        <ul className='FeatureList'>
          {plan.features.map((feature, idx) => (
            <li className={`FeatureItem ${feature.correct ? 'correct' : 'incorrect'}`} key={idx} >
             {feature.name}
           </li>
           ))}
        </ul>
        <button className='Subscription-btn' onClick={togglePayment}>Choose Plan</button>
      </div>
    ))}
  </div>
);

export default SubscriptionPlans;

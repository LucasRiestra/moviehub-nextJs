'use client';

import React, { useState } from 'react';
import { useUser } from '@auth0/nextjs-auth0/client';
import '../[id]/User.css';
import Link from 'next/link';
import Header from '@/components/Header/header';
import Footer from '@/components/Footer/footer';

const User = () => {
    const { user } = useUser();

  return (
    <div>
      <Header />
    <div className="user-container">
    <img src={user?.picture || ''} alt="user-profile" className="user-profile" />
      <div className="user-info">
        <p className="user-name">{user?.name}</p>
        <p className="user-email">{user?.email}</p>
        <Link href="/home">
            <button className="go-back-button">Go Back</button>
          </Link>
      </div>
    </div>
    <Footer />
    </div>
  );
};

export default User;

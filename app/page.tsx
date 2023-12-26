import React from 'react';
import {sql} from '@vercel/postgres';

const Page = async () => {

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center pt-8">
      <h1 className="text-2xl font-bold mb-5 text-gray-900">Tạo Short Link</h1>
      <p>Contact Telegram: @tiepbm</p>
    </div>
  );
};
export default Page;

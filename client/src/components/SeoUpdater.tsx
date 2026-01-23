import React from 'react';
import { Helmet } from 'react-helmet';
import { seoOverrides } from '../data/seoOverrides';

// This component takes the 'slug' and force-updates the Title/Description
const SeoUpdater = ({ slug }) => {
  // 1. Look for the slug in our Master List
  const overrideData = seoOverrides[slug];

  // 2. If we don't have an override, DO NOTHING. 
  // This ensures we don't break pages that are already working.
  if (!overrideData) {
    return null; 
  }

  // 3. If we DO have an override, inject it into the Head
  return (
    <Helmet>
      <title>{overrideData.title} - Janmasethu</title>
      <meta name="description" content={overrideData.description} />
      <meta property="og:title" content={`${overrideData.title} - Janmasethu`} />
      <meta property="og:description" content={overrideData.description} />
      <link rel="canonical" href={`https://janmasethu.com/knowledge-hub/${slug}`} />
    </Helmet>
  );
};

export default SeoUpdater;

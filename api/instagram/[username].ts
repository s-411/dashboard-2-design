import type { VercelRequest, VercelResponse } from '@vercel/node';

const RAPIDAPI_HOST = 'instagram-api-fast-reliable-data-scraper.p.rapidapi.com';

interface InstagramProfileResponse {
  username?: string;
  full_name?: string;
  profile_pic_url?: string;
  hd_profile_pic_url_info?: {
    url?: string;
  };
  follower_count?: number;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ success: false, error: 'Method not allowed' });
  }

  const { username } = req.query;

  if (!username || typeof username !== 'string') {
    return res.status(400).json({ success: false, error: 'Username is required' });
  }

  const apiKey = process.env.RAPIDAPI_KEY;
  if (!apiKey) {
    console.error('RAPIDAPI_KEY environment variable not set');
    return res.status(500).json({ success: false, error: 'API configuration error' });
  }

  try {
    const response = await fetch(
      `https://${RAPIDAPI_HOST}/profile?username=${encodeURIComponent(username)}`,
      {
        method: 'GET',
        headers: {
          'x-rapidapi-host': RAPIDAPI_HOST,
          'x-rapidapi-key': apiKey,
        },
      }
    );

    if (!response.ok) {
      console.error(`RapidAPI error: ${response.status} ${response.statusText}`);
      return res.status(response.status).json({
        success: false,
        error: `Failed to fetch profile: ${response.statusText}`,
      });
    }

    const data: InstagramProfileResponse = await response.json();

    // Extract profile picture URL (prefer HD version)
    const profilePicUrl = data.hd_profile_pic_url_info?.url || data.profile_pic_url || null;

    return res.status(200).json({
      success: true,
      username: data.username || username,
      displayName: data.full_name || null,
      profilePicUrl,
      followerCount: data.follower_count || null,
    });
  } catch (error) {
    console.error('Error fetching Instagram profile:', error);
    return res.status(500).json({
      success: false,
      error: 'Failed to fetch Instagram profile',
    });
  }
}

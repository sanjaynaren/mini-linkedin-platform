import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { User, Edit2, Mail, Calendar } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { supabase } from '../lib/supabase';
import { useAuthContext } from '../contexts/AuthContext';
import { PostCard } from '../components/PostCard';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { EditProfile } from '../components/EditProfile';

interface Profile {
  id: string;
  full_name: string;
  email: string;
  bio: string | null;
  created_at: string;
}

interface Post {
  id: string;
  content: string;
  created_at: string;
  author_id: string;
  profiles?: {
    full_name: string;
    email: string;
  };
}

export function Profile() {
  const { userId } = useParams<{ userId: string }>();
  const { user } = useAuthContext();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  const isOwnProfile = user?.id === userId;

  const fetchProfile = async () => {
    if (!userId) return;

    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (error) {
        setError('Profile not found');
      } else {
        setProfile(data);
      }
    } catch (err) {
      setError('Failed to load profile');
    }
  };

  const fetchUserPosts = async () => {
    if (!userId) return;

    try {
      const { data, error } = await supabase
        .from('posts')
        .select(`
          id,
          content,
          created_at,
          author_id,
          profiles!posts_author_id_fkey (
            full_name,
            email
          )
        `)
        .eq('author_id', userId)
        .order('created_at', { ascending: false });

      if (error) {
        setError('Failed to load posts');
      } else {
        setPosts(data || []);
      }
    } catch (err) {
      setError('Failed to load posts');
    }
  };

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      await Promise.all([fetchProfile(), fetchUserPosts()]);
      setLoading(false);
    };

    loadData();
  }, [userId]);

  const handleProfileUpdated = () => {
    fetchProfile();
    setIsEditing(false);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (error || !profile) {
    return (
      <div className="text-center py-12">
        <p className="text-red-600">{error || 'Profile not found'}</p>
      </div>
    );
  }

  const memberSince = formatDistanceToNow(new Date(profile.created_at), { addSuffix: true });

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
        <div className="flex items-start justify-between">
          <div className="flex items-start space-x-6">
            <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center">
              <User className="h-12 w-12 text-blue-600" />
            </div>
            
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-gray-900 mb-2">
                {profile.full_name}
              </h1>
              
              <div className="flex items-center space-x-4 text-sm text-gray-600 mb-3">
                <div className="flex items-center space-x-1">
                  <Mail className="h-4 w-4" />
                  <span>{profile.email}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Calendar className="h-4 w-4" />
                  <span>Member {memberSince}</span>
                </div>
              </div>
              
              {profile.bio && (
                <p className="text-gray-700 leading-relaxed">{profile.bio}</p>
              )}
              
              {!profile.bio && isOwnProfile && (
                <p className="text-gray-500 italic">Add a bio to tell others about yourself</p>
              )}
            </div>
          </div>
          
          {isOwnProfile && (
            <button
              onClick={() => setIsEditing(true)}
              className="flex items-center space-x-2 px-4 py-2 text-sm text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <Edit2 className="h-4 w-4" />
              <span>Edit Profile</span>
            </button>
          )}
        </div>
      </div>

      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          Posts ({posts.length})
        </h2>
        
        <div className="space-y-4">
          {posts.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
              <p className="text-gray-500">
                {isOwnProfile ? "You haven't posted anything yet" : "No posts yet"}
              </p>
            </div>
          ) : (
            posts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))
          )}
        </div>
      </div>

      {isEditing && (
        <EditProfile
          profile={profile}
          onClose={() => setIsEditing(false)}
          onProfileUpdated={handleProfileUpdated}
        />
      )}
    </div>
  );
}
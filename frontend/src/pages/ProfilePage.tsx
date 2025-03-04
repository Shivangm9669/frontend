import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';

const ProfilePage = () => {
    const { user, setUser, token, logout } = useAuth();
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState<string | null>(null);

    const handleSubscriptionUpgrade = async () => {
        if (!user) return;
        setLoading(true);
        setMessage(null);
        try {
            await axios.put(
                `http://localhost:5008/api/Subscription/upgrade/${user.userId}`,
                {},
                { headers: { Authorization: `Bearer ${token}` } }
            );
            setUser({ ...user, isPremium: true });
            setMessage('Subscription upgraded to Premium!');
        } catch (error) {
            console.error('Upgrade failed:', error);
            setMessage('Failed to upgrade subscription.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="profile-page">
            <h2>Profile</h2>
            {user ? (
                <div>
                    <p>Name: {user.name}</p>
                    <p>Email: {user.email}</p>
                    <p>Status: {user.isPremium ? 'Premium' : 'Normal'}</p>
                    {!user.isPremium && (
                        <button onClick={handleSubscriptionUpgrade} disabled={loading}>
                            {loading ? 'Upgrading...' : 'Upgrade to Premium'}
                        </button>
                    )}
                    <button onClick={logout}>Logout</button>
                    {message && <p>{message}</p>}
                </div>
            ) : (
                <p>Please login to view your profile.</p>
            )}
        </div>
    );
};

export default ProfilePage;

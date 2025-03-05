import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import { User, Crown, LogOut,Loader2, CheckCircle2, XCircle } from 'lucide-react';
import '../style/profile-page.css';
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

    if (!user) {
        return (
            <div className="profile-container">
                <div className="profile-card">
                    <p className="login-prompt">Please login to view your profile.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="profile-container">
            <div className="profile-card">
                <div className="profile-header">
                    <div className="profile-avatar">
                        <User size={48} strokeWidth={1.5} />
                    </div>
                    <h2>{user.name}</h2>
                    <p className="profile-email">{user.email}</p>
                </div>

                <div className="profile-details">
                    <div className="profile-status">
                        <span>Account Status:</span>
                        {user.isPremium ? (
                            <div className="status-badge premium">
                                <Crown size={20} />
                                <span>Premium</span>
                            </div>
                        ) : (
                            <div className="status-badge normal">
                                <span>Normal</span>
                            </div>
                        )}
                    </div>
                </div>

                {!user.isPremium && (
                    <div className="profile-actions">
                        <button 
                            onClick={handleSubscriptionUpgrade} 
                            disabled={loading}
                            className="upgrade-button"
                        >
                            {loading ? (
                                <>
                                    <Loader2 className="animate-spin" />
                                    <span>Upgrading...</span>
                                </>
                            ) : (
                                <>
                                    <Crown />
                                    <span>Upgrade to Premium</span>
                                </>
                            )}
                        </button>
                    </div>
                )}

                <div className="profile-footer">
                    {message && (
                        <div className={`message ${message.includes('failed') ? 'error' : 'success'}`}>
                            {message.includes('failed') ? <XCircle /> : <CheckCircle2 />}
                            <span>{message}</span>
                        </div>
                    )}

                    <button 
                        onClick={logout} 
                        className="logout-button"
                    >
                        <LogOut />
                        <span>Logout</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;
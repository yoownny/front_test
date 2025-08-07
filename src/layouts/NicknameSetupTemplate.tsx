import React from 'react';
import NicknameCard from '@/components/cards/NicknameCard';

interface NicknameSetupTemplateProps {
  onRegister: (nickname: string) => Promise<void>;
  onCheckNickname: (nickname: string) => Promise<boolean>;
  onBackToLogin: () => void;
  isRegistering: boolean;
  error?: string | null;
}

const NicknameSetupTemplate: React.FC<NicknameSetupTemplateProps> = ({
  onRegister,
  onCheckNickname,
  onBackToLogin,
  isRegistering,
  error
}) => {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <NicknameCard
        onRegister={onRegister}
        onCheckNickname={onCheckNickname}
        onBackToLogin={onBackToLogin}
        isRegistering={isRegistering}
        error={error}
      />
    </div>
  );
};

export default NicknameSetupTemplate;
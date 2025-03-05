import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Container, RatingContainer, StarButton } from '../styles/StyledComponents';
import { useTheme } from '../context/ThemeContext';

const ReviewContainer = styled.div`
  background-color: ${({ theme }) => theme.colors.light.background};
  border-radius: ${({ theme }) => theme.borderRadius.default};
  padding: ${({ theme }) => theme.spacing[4]};
  margin-bottom: ${({ theme }) => theme.spacing[4]};
`;

const TranscriptItem = styled.div`
  padding: ${({ theme }) => theme.spacing[3]};
  margin-bottom: ${({ theme }) => theme.spacing[2]};
  border-radius: ${({ theme }) => theme.borderRadius.default};
  background-color: ${({ isUser, theme }) => 
    isUser ? theme.colors.secondary.main : theme.colors.light.muted};
  color: ${({ isUser, theme }) => 
    isUser ? theme.colors.light.background : theme.colors.light.foreground};
`;

const FeedbackSection = styled.div`
  margin-top: ${({ theme }) => theme.spacing[4]};
`;

const Button = styled.button`
  background-color: ${({ theme }) => theme.colors.primary.main};
  color: white;
  padding: ${({ theme }) => theme.spacing[2]} ${({ theme }) => theme.spacing[3]};
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.default};
  cursor: pointer;
  margin-top: ${({ theme }) => theme.spacing[4]};
  
  &:hover {
    background-color: ${({ theme }) => theme.colors.primary.hover};
  }
`;

const Review = () => {
  const { theme } = useTheme();
  const location = useLocation();
  const navigate = useNavigate();
  const { transcript = [] } = location.state || {};
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState('');

  const handleRating = (value) => {
    setRating(value);
  };

  const handleSubmit = () => {
    // Here you would typically send the rating and feedback to your backend
    console.log('Rating:', rating);
    console.log('Feedback:', feedback);
    
    // Navigate back to scenario selection
    navigate('/');
  };

  return (
    <Container>
      <h1>Conversation Review</h1>
      
      <ReviewContainer theme={theme}>
        <h2>Conversation Transcript</h2>
        {transcript.length > 0 ? (
          transcript.map((message, index) => (
            <TranscriptItem 
              key={index} 
              isUser={message.isUser} 
              theme={theme}
            >
              <strong>{message.isUser ? 'You' : 'AI'}: </strong>
              {message.text}
            </TranscriptItem>
          ))
        ) : (
          <p>No conversation transcript available.</p>
        )}
      </ReviewContainer>
      
      <FeedbackSection theme={theme}>
        <h2>Rate Your Experience</h2>
        <RatingContainer>
          {[1, 2, 3, 4, 5].map((star) => (
            <StarButton
              key={star}
              active={star <= rating}
              onClick={() => handleRating(star)}
            >
              ★
            </StarButton>
          ))}
        </RatingContainer>
        
        <h3>Additional Feedback</h3>
        <textarea
          rows="4"
          placeholder="Share your thoughts about this conversation practice..."
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
          style={{ 
            width: '100%', 
            padding: theme.spacing[2],
            marginTop: theme.spacing[2],
            borderRadius: theme.borderRadius.default,
            border: `1px solid ${theme.colors.light.border}`
          }}
        />
        
        <Button theme={theme} onClick={handleSubmit}>
          Submit Review
        </Button>
      </FeedbackSection>
    </Container>
  );
};

export default Review;
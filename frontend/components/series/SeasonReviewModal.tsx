import React, { useState, useCallback } from "react";
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Pressable,
  ActivityIndicator,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { styles } from "../../styles/seasonReviewModal.styles";
import { API_URL } from "../../utils/getApiUtils";
import { getSeasonReviewModalTexts } from "../../utils/seasonReviewModalUtils";

type SeasonReviewModalProps = {
  visible: boolean;
  onClose: () => void;
  season?: { id: number; seasonNumber: number };
  seriesId: number;
  userId: string;
};

export default function SeasonReviewModal({
  visible,
  onClose,
  season,
  seriesId,
  userId,
}: SeasonReviewModalProps) {
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");
  const [containsSpoilers, setContainsSpoilers] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const { heading, subtitle, placeholder } = getSeasonReviewModalTexts(season);

  const handleStarPress = useCallback((star: number) => setRating(star), []);

  const handleSubmit = useCallback(async () => {
    setSubmitting(true);
    try {
      await fetch(`${API_URL}/season-reviews`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId,
          seriesId,
          seasonId: season?.id,
          rating,
          review,
          containsSpoilers,
          dismissed: false,
        }),
      });
      onClose();
    } catch {
      // TODO: handle error
    } finally {
      setSubmitting(false);
    }
  }, [userId, seriesId, season, rating, review, containsSpoilers, onClose]);

  const handleNoThanks = useCallback(async () => {
    setSubmitting(true);
    try {
      await fetch(`${API_URL}/season-reviews`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId,
          seriesId,
          seasonId: season?.id,
          dismissed: true,
        }),
      });
      onClose();
    } catch {
      // TODO: handle error
    } finally {
      setSubmitting(false);
    }
  }, [userId, seriesId, season, onClose]);

  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.modal}>
          <Text style={styles.title}>{heading}</Text>
          <Text style={styles.subtitle}>{subtitle}</Text>
          <View style={styles.starsRow}>
            {[1, 2, 3, 4, 5].map((star) => (
              <TouchableOpacity
                key={star}
                onPress={() => handleStarPress(star)}
                disabled={submitting}
              >
                <MaterialIcons
                  name={star <= rating ? "star" : "star-border"}
                  size={32}
                  color="#FFD700"
                  style={{ marginHorizontal: 4 }}
                />
              </TouchableOpacity>
            ))}
          </View>
          <Text style={styles.addReviewLabel}>Add a review</Text>
          <TextInput
            style={styles.input}
            placeholder={placeholder}
            multiline
            value={review}
            onChangeText={setReview}
            editable={!submitting}
          />
          <View style={styles.checkboxRow}>
            <Pressable
              onPress={() => setContainsSpoilers((v) => !v)}
              style={styles.checkbox}
              hitSlop={8}
              disabled={submitting}
            >
              <MaterialIcons
                name={
                  containsSpoilers ? "check-box" : "check-box-outline-blank"
                }
                size={24}
                color={containsSpoilers ? "#13A4EC" : "#B0B0B0"}
              />
            </Pressable>
            <Text
              style={styles.checkboxLabel}
              onPress={() => setContainsSpoilers((v) => !v)}
            >
              Contains spoilers
            </Text>
          </View>
          <View style={styles.buttonsRowCentered}>
            <TouchableOpacity
              style={[styles.cancelButton, styles.fullWidthButton]}
              onPress={handleNoThanks}
              disabled={submitting}
            >
              <Text style={styles.cancelButtonText}>No thanks</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.submitButton,
                styles.fullWidthButton,
                (submitting || rating === 0) && styles.submitButtonDisabled,
              ]}
              onPress={handleSubmit}
              disabled={submitting || rating === 0}
            >
              {submitting ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text style={styles.submitButtonText}>Submit</Text>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

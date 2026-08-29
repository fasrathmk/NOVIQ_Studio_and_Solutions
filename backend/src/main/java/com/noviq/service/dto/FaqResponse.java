package com.noviq.service.dto;

public record FaqResponse(String id, String question, String answer, int displayOrder) {
}

package com.sgbd.sportshop.exception;

import org.springframework.dao.DataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.time.LocalDateTime;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(DataAccessException.class)
    public ResponseEntity<ApiErrorResponse> handleDatabaseException(DataAccessException exception) {
        String message = extractDatabaseMessage(exception);

        ApiErrorResponse response = new ApiErrorResponse(
                message,
                LocalDateTime.now()
        );

        return ResponseEntity
                .status(HttpStatus.BAD_REQUEST)
                .body(response);
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ApiErrorResponse> handleGenericException(Exception exception) {
        ApiErrorResponse response = new ApiErrorResponse(
                "A aparut o eroare neasteptata.",
                LocalDateTime.now()
        );

        return ResponseEntity
                .status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(response);
    }

    private String extractDatabaseMessage(DataAccessException exception) {
        Throwable cause = exception.getRootCause();

        if (cause != null && cause.getMessage() != null) {
            String message = cause.getMessage();

            int whereIndex = message.indexOf("Where:");
            if (whereIndex != -1) {
                message = message.substring(0, whereIndex).trim();
            }

            return message;
        }

        return "A aparut o eroare la nivelul bazei de date.";
    }
}
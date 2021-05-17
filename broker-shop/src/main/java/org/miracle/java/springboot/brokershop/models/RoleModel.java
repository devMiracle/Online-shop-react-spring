package org.miracle.java.springboot.brokershop.models;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor

// Игнорируем неивестные свойства идущие от фронта
@JsonIgnoreProperties(ignoreUnknown = true)
// Если фронтенд не готов принимать данные, то не заполняем их на бэке(не нужно включать поля, которые равны NULL), при отправке на фронт
@JsonInclude(JsonInclude.Include.NON_NULL)
public class RoleModel {
    public Long id;
    public String name;
}

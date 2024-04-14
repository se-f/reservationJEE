package com.jee.reservation.models;

import jakarta.persistence.*;

import java.time.LocalDate;

@Entity
@Table(name = "chambre")
public class Chambre {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int idchambre;

    private String type;
    private int prix;
    private LocalDate disponibilite;

    private String description;

    private String image;

    public int getIdchambre() {
        return idchambre;
    }

    public void setIdchambre(int id_chambre) {
        this.idchambre = id_chambre;
    }

    public String getType() {
        return type;
    }

    public void setType(String type_chambre) {
        this.type = type_chambre;
    }

    public int getPrix() {
        return prix;
    }

    public void setPrix(int prix) {
        this.prix = prix;
    }

    public LocalDate getDisponibilite() {
        return disponibilite;
    }

    public void setDisponibilite(LocalDate disponibilite) {
        this.disponibilite = disponibilite;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }
}

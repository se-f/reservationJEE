package com.jee.reservation.controllers;

import com.jee.reservation.models.Chambre;
import com.jee.reservation.services.ChambreService;
import com.jee.reservation.services.ReservationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@CrossOrigin("*")
@RestController
@RequestMapping("/chambre")
public class ChambreController {

    @Autowired
    private ChambreService chambreService;

    @Autowired
    private ReservationService reservationService;


    @GetMapping("/{id}")
    public ResponseEntity<Chambre> getChambre(@PathVariable Integer id) {

        Chambre chambre = chambreService.getChambreById(id);
        if (chambre != null) {
            return ResponseEntity.ok(chambre);
        } else {
            return ResponseEntity.notFound().build();
        }

    }

    @GetMapping()
    public ResponseEntity<List<Chambre>> getAllChambres() {
        List<Chambre> chambres = chambreService.getAllChambres();
        return ResponseEntity.ok(chambres);
    }

    @GetMapping("/disponible")
    public ResponseEntity<List<Chambre>> getAllAvailableChambres() {
        List<Chambre> chambres = chambreService.getAllAvailableChambres();
        return ResponseEntity.ok(chambres);
    }

    @PostMapping
    public ResponseEntity<Chambre> createChambre(@RequestBody Chambre chambre) {

        Chambre createdChambre = chambreService.createChambre(chambre);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdChambre);

    }

    @PutMapping("/{id}")
    public ResponseEntity<Chambre> updateChambre(@PathVariable Integer id, @RequestBody Chambre chambre) {

        Chambre updatedChambre = chambreService.updateChambre(chambre);

        if (updatedChambre != null) {
            return ResponseEntity.ok(updatedChambre);
        } else {
            return ResponseEntity.notFound().build();
        }

    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteChambre(@PathVariable Integer id) {
        chambreService.deleteChambre(id);
        reservationService.deleteAllByChambreid(id);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/disponible/date")
    public ResponseEntity<List<Chambre>> getAllAvailableChambresParDate(
            @RequestParam @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate dateArrivee,
            @RequestParam @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate dateDepart) {
        List<Chambre> chambresDisponibles = chambreService.getAllAvailableChambresByDates(dateArrivee, dateDepart);
        return ResponseEntity.ok(chambresDisponibles);
    }

    @GetMapping("/type/{type}")
    public ResponseEntity<List<Chambre>> getAllAvailableChambresParType(@PathVariable String type) {
        List<Chambre> chambres = chambreService.findAllByType(type);
        return ResponseEntity.ok(chambres);
    }

    @GetMapping("disponible/type/{type}")
    public ResponseEntity<List<Chambre>> getAllAvailableChambresDisponiblesParType(@PathVariable String type) {
        List<Chambre> chambres = chambreService.getAllAvailableChambresDisponiblesParType(type);
        return ResponseEntity.ok(chambres);
    }

    @GetMapping("/disponible/type/{type}/date")
    public ResponseEntity<List<Chambre>> getAllAvailableChambresDisponiblesParDateParType
            (@PathVariable String type,
             @RequestParam @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate dateArrivee,
             @RequestParam @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate dateDepart
            ) {

        List<Chambre> chambresDisponibles = chambreService.getAllAvailableChambresDisponiblesParDateParType(type, dateArrivee, dateDepart);
        return ResponseEntity.ok(chambresDisponibles);
    }

}

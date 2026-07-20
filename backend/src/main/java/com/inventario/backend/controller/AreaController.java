package com.inventario.backend.controller;

import com.inventario.backend.model.Area;
import com.inventario.backend.service.AreaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/areas")
@CrossOrigin("*")
public class AreaController {

    @Autowired
    private AreaService areaService;

    @GetMapping
    public List<Area> listarAreas() {

        return areaService.listarAreas();

    }

}
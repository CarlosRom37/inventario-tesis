package com.inventario.backend.controller;

import com.inventario.backend.dto.DashboardDTO;
import com.inventario.backend.service.DashboardService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/dashboard")
@CrossOrigin("*")
public class DashboardController {

    @Autowired
    private DashboardService dashboardService;

    @GetMapping
    public DashboardDTO obtenerDashboard() {

        return dashboardService.obtenerResumen();

    }

}
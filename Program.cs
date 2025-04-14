using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using Pomelo.EntityFrameworkCore.MySql;
using CapstoneController.Data;
using AutoMapper;
using CapstoneController.Dtos;
using CapstoneController.Models;
using Microsoft.AspNetCore.Mvc;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var sqlConBuilder = new MySqlConnector.MySqlConnection();

sqlConBuilder.ConnectionString = builder.Configuration.GetConnectionString("AivenMySQL");
//sqlConBuilder.UserID = builder.Configuration["UserId"];
//sqlConBuilder.Password = builder.Configuration["Password"];

builder.Services.AddDbContext<AppDbContext>(opt => opt.UseMySql(sqlConBuilder.ConnectionString, new MySqlServerVersion(new Version(10, 11, 10))));
builder.Services.AddScoped<ICapstoneRepo, CapstoneRepo>();
builder.Services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());

var app = builder.Build();


if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();


/* Stores interview information from frontend to database */
app.MapPost("api/v1/interviews", async (ICapstoneRepo repo, IMapper mapper, InterviewDto interviewDto) => {
    var interviewmodel = mapper.Map<Interviews>(interviewDto);

    await repo.CreateInterview(interviewmodel);
    await repo.SaveChanges();

    return Results.Created($"{interviewDto}", interviewDto);
});

/* Deletes an interview from the database with a specific id */
app.MapDelete("api/v1/interviews/{id}", async (ICapstoneRepo repo, IMapper mapper, int id) => {
    var interview = await repo.GetInterviewById(id);
    if (interview == null){
        return Results.NotFound();
    }

    repo.DeleteInterview(interview);

    await repo.SaveChanges();

    return Results.NoContent();
});

/* Gets all the interviews from the database to the frontend */
app.MapGet("api/v1/interviews", async (ICapstoneRepo repo, IMapper mapper) => {
    var interviews = await repo.GetAllInterviews();
    return Results.Ok(mapper.Map<IEnumerable<InterviewDto>>(interviews));
});

app.MapGet("api/v1/interviews/{id}", async (ICapstoneRepo repo, IMapper mapper, int id) => {
    var interview = await repo.GetInterviewById(id);
    if (interview != null){
        return Results.Ok(mapper.Map<InterviewDto>(interview));
    }
    return Results.NotFound();
});

app.Run();



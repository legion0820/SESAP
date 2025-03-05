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

var sqlConBuilder = new SqlConnectionStringBuilder();

sqlConBuilder.ConnectionString = builder.Configuration.GetConnectionString("MariaDbConnection");
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

app.MapGet("api/v1/transcripts", async (ICapstoneRepo repo, IMapper mapper) => {
    var transcripts = await repo.GetAllTranscripts();
    return Results.Ok(mapper.Map<IEnumerable<TranscriptDto>>(transcripts));
});

app.MapPost("api/v1/transcripts", async (ICapstoneRepo repo, IMapper mapper, TranscriptDto transcriptDto) => {
    var transcriptmodel = mapper.Map<Transcripts>(transcriptDto);

    await repo.CreateTranscript(transcriptmodel);
    await repo.SaveChanges();

    return Results.Created($"{transcriptDto}", transcriptDto);
});

/* Stores interview information from frontend to database */
app.MapPost("api/v1/interviews", async (ICapstoneRepo repo, IMapper mapper, InterviewDto interviewDto) => {
    var interviewmodel = mapper.Map<Interviews>(interviewDto);

    await repo.CreateInterview(interviewmodel);
    await repo.SaveChanges();

    return Results.Created($"{interviewDto}", interviewDto);
});

app.Run();



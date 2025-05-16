using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using Pomelo.EntityFrameworkCore.MySql;
using CapstoneController.Data;
using AutoMapper;
using CapstoneController.Dtos;
using CapstoneController.Models;
using Microsoft.AspNetCore.Mvc;
using System.Diagnostics;
using System.Text.Json;



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
    ///
;
    string baseDirectory = Directory.GetCurrentDirectory();

    string populateDatabase = Path.Combine(baseDirectory, "populateDatabase.py");

    var startDbInfo = new ProcessStartInfo
    {
        FileName = "python", // Ensure the 'python' path is correct if not in PATH
        Arguments = $"\"{populateDatabase}\"", // Path to the script
        RedirectStandardOutput = true,  // Capture stdout
        RedirectStandardError = true,   // Capture stderr
        UseShellExecute = false, // Don't use the shell to start the process
        CreateNoWindow = true,   // Prevent the process from showing a window
        WorkingDirectory = baseDirectory // Ensure the working directory is set correctly
    };

    Console.WriteLine("[DEBUG] Starting the Python script");

    using (var process = new Process { StartInfo = startDbInfo })
    {
        try
        {
            Console.WriteLine("[DEBUG] Process started, waiting for completion...");

            process.Start();

            // Capture standard output and errors
            Task<string> stdOutTask = process.StandardOutput.ReadToEndAsync();
            Task<string> stdErrTask = process.StandardError.ReadToEndAsync();

            // Wait for process exit (30 seconds timeout)
            if (!process.WaitForExit(60000)) // 30 seconds timeout
            {
                process.Kill();
                Console.WriteLine("[ERROR] Script timed out.");
                return Results.Problem("populateDatabase.py timed out after 30 seconds.");
            }

            string stdout = await stdOutTask;
            string stderr = await stdErrTask;

            Console.WriteLine("[DEBUG] Script completed successfully.");
            Console.WriteLine($"[DEBUG] Stdout: {stdout}");
            Console.WriteLine($"[DEBUG] Stderr: {stderr}");

            if (process.ExitCode != 0)
            {
                return Results.Problem($"populateDatabase.py failed with exit code {process.ExitCode}");
            }
        }
        catch (Exception ex)
        {
            Console.WriteLine($"[ERROR] Exception occurred: {ex.Message}");
            return Results.Problem($"Exception occurred: {ex.Message}");
        }
    }

    Console.WriteLine("[DEBUG] startDB process finished");

    ////////

    string pythonScriptPath = Path.Combine(baseDirectory, "queryAll.py");

    string transcriptFilePath = interviewDto.interviewTranscript;  

    var startQueryInfo = new ProcessStartInfo
    {
        FileName = "python",  
        Arguments = $"\"{pythonScriptPath}\"",  // \"{transcriptFilePath}\"
        RedirectStandardOutput = true,  // Capture stdout
        RedirectStandardError = true,   // Capture stderr
        UseShellExecute = false, // Don't use the shell to start the process
        CreateNoWindow = true,   // Prevent the process from showing a window
        WorkingDirectory = baseDirectory // Ensure the working directory is set correctly
    };

    Console.WriteLine("[DEBUG] Starting the Python QueryAll script");

    using (var process = new Process { StartInfo = startQueryInfo })
    {
        try
        {
            Console.WriteLine("[DEBUG] Process started, waiting for completion...");

            process.Start();

            // Capture standard output and errors
            Task<string> stdOutTask = process.StandardOutput.ReadToEndAsync();
            Task<string> stdErrTask = process.StandardError.ReadToEndAsync();

            // Wait for process exit (30 seconds timeout)
            if (!process.WaitForExit(60000)) // 30 seconds timeout
            {
                process.Kill();
                Console.WriteLine("[ERROR] Query All Script timed out.");
                return Results.Problem("queryAll.py timed out after 30 seconds.");
            }

            string stdout = await stdOutTask;
            string stderr = await stdErrTask;

            Console.WriteLine("[DEBUG] queryAll Script completed successfully.");
            Console.WriteLine($"[DEBUG] Stdout: {stdout}");
            Console.WriteLine($"[DEBUG] Stderr: {stderr}");

            if (process.ExitCode != 0)
            {
                return Results.Problem($"queryAll.py failed with exit code {process.ExitCode}");
            }
        }
        catch (Exception ex)
        {
            Console.WriteLine($"[ERROR] Exception occurred: {ex.Message}");
            return Results.Problem($"Exception occurred: {ex.Message}");
        }
    }

    Console.WriteLine("[DEBUG] queryAll process finished");

    //////

    string chartGeneratorFilePath = Path.Combine(baseDirectory, "generateCharts.py");
    var startChartGeneratorInfo = new ProcessStartInfo
    {
        FileName = "python",
        Arguments = $"\"{chartGeneratorFilePath}\"",
        RedirectStandardOutput = true,  // Capture stdout
        RedirectStandardError = true,   // Capture stderr
        UseShellExecute = false, // Don't use the shell to start the process
        CreateNoWindow = true,   // Prevent the process from showing a window
        WorkingDirectory = baseDirectory // Ensure the working directory is set correctly
    };

    Console.WriteLine("[DEBUG] Starting the Python chartGenerator script");

    using (var process = new Process { StartInfo = startChartGeneratorInfo })
    {
        try
        {
            Console.WriteLine("[DEBUG] Process started, waiting for completion...");

            process.Start();

            // Capture standard output and errors
            Task<string> stdOutTask = process.StandardOutput.ReadToEndAsync();
            Task<string> stdErrTask = process.StandardError.ReadToEndAsync();

            // Wait for process exit (30 seconds timeout)
            if (!process.WaitForExit(60000)) // 30 seconds timeout
            {
                process.Kill();
                Console.WriteLine("[ERROR] Chart generator Script timed out.");
                return Results.Problem("generateCharts.py timed out after 30 seconds.");
            }

            string stdout = await stdOutTask;
            string stderr = await stdErrTask;

            Console.WriteLine("[DEBUG] generateCharts Script completed successfully.");
            Console.WriteLine($"[DEBUG] Stdout: {stdout}");
            Console.WriteLine($"[DEBUG] Stderr: {stderr}");

            if (process.ExitCode != 0)
            {
                return Results.Problem($"generateCharts.py failed with exit code {process.ExitCode}");
            }
        }
        catch (Exception ex)
        {
            Console.WriteLine($"[ERROR] Exception occurred: {ex.Message}");
            return Results.Problem($"Exception occurred: {ex.Message}");
        }
    }

    Console.WriteLine("[DEBUG] generateCharts process finished");
    

    ///
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

app.Run();



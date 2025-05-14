using CapstoneController.Data;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;
namespace CapstoneController.Models{
    public class Themes{
        [Key]
        public int themeId {get; set;}

        [Required]
        public string? themeName {get; set;}

    }
}
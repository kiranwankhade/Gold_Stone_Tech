// microservice 2 - CSV File

const express = require('express');
const User = require('../Model/User.model');

const fs = require('fs');
const csv = require('fast-csv');
const router = express.Router();

const csvWriter = require('csv-writer').createObjectCsvWriter;

// router.get('/', async (req, res) => {
// //   try {
// //     const users = await User.find();
//     // const csvData = users.map((user) => {
//     //   return `${user._Id},${user.name},${user.email},${user.gender},${user.status},${user.Created_at},${user.Updated_at}`;
//     // });
//     // const csvContent = 'Id,name,email,gender,status,Created_at,Updated_at\n' + csvData.join('\n');

// //     res.set('Content-Type', 'text/csv');
// //     res.attachment('user_master.csv');
// //     res.send(csvContent);
// //   } catch (error) {
// //     console.error('Error exporting data to CSV', error);
// //     res.status(500).json({ error: 'Internal server error' });
// //   }

// // diff
// // try {
// //     // Fetch user data from the database
// //     const users = await User.find();

// //     // Define CSV header and fields
// //     const csvHeader = [
// //       { id: '_id', title: 'ID' },
// //       { id: 'name', title: 'Name' },
// //       { id: 'email', title: 'Email' },
// //       { id: 'gender', title: 'Gender' },
// //       { id: 'status', title: 'Status' },
// //       { id: 'createdAt', title: 'Created At' },
// //       { id: 'updatedAt', title: 'Updated At' },
// //     ];

// //     // Map user data to CSV records
// //     const csvRecords = users.map((user) => (
// //         {
// //       id: user._id,
// //       name: user.name,
// //       email: user.email,
// //       gender: user.gender,
// //       status: user.status,
// //       createdAt: user.Created_at,
// //       updatedAt: user.Updated_at,
// //     }
    
// //     ));

// //     // const csvData = users.map((user) => {
// //     //     return `${user._Id},${user.name},${user.email},${user.gender},${user.status},${user.Created_at},${user.Updated_at}`;
// //     //   });

// //     //   const csvContent = 'Id,name,email,gender,status,Created_at,Updated_at\n' + csvData.join('\n');
  

// //     // Create a CSV writer
// //     const csvWriter = createCsvWriter({
// //       path: 'user.csv',
// //       header: csvHeader,
// //     });

// //     // Write records to CSV file
// //     await csvWriter.writeRecords(csvRecords);
// //     res.send(csvRecords);
// //     console.log('User data exported to CSV file successfully.');
// //   } catch (error) {
// //     console.error('Error exporting user data to CSV:', error);
// //   }


// try {
//     // Fetch user data from the database
//     const users = await User.find();

//     // Define the CSV file path
//     const filePath = './user_data.csv';

//     // Create a write stream to the CSV file
//     const writableStream = fs.createWriteStream(filePath);

//     // Create a CSV stream
//     const csvStream = csv.format({ headers: true });

//     // Pipe the CSV stream to the write stream
//     csvStream.pipe(writableStream);

//     // Write the user data to the CSV file
//     users.forEach((user) => {
//       csvStream.write({
//         ID: user._id,
//         Name: user.name,
//         Email: user.email,
//         Gender: user.gender,
//         Status: user.status,
//         Created_at: user.Created_at,
//         Updated_at: user.Updated_at,
//       });
//     });

//     // End the CSV stream and close the write stream
//     csvStream.end();
//     writableStream.end();
//     res.send("User data exported to CSV file successfully")
//     console.log('User data exported to CSV file successfully.');
//   } catch (error) {
//     console.error('Error exporting user data to CSV:', error);
//   }

// });




router.get('/', async (req, res) => {
    try {
        // Fetch user data from the database
        const users = await User.find();
    
        // Define CSV file path and headers
        const csvFilePath = 'users.csv';
        const csvHeaders = [
          { id: '_id', title: 'ID' },
          { id: 'name', title: 'Name' },
          { id: 'email', title: 'Email' },
          { id: 'gender', title: 'Gender' },
          { id: 'status', title: 'Status' },
          { id: 'Created_at', title: 'Created_at' },
          { id: 'Updated_at', title: 'Updated_at' },
        ];
    
        // Create a new CSV writer
        const csvWriterInstance = csvWriter({
          path: csvFilePath,
          header: csvHeaders,
        });
    
        // Write the user data to the CSV file
        await csvWriterInstance.writeRecords(users);
    
        // Set the appropriate headers for the response
        res.setHeader('Content-Type', 'text/csv');
        res.setHeader('Content-Disposition', `attachment; filename=${csvFilePath}`);
    
        // Pipe the CSV file to the response object
        fs.createReadStream(csvFilePath).pipe(res);
      } catch (error) {
        console.error('Error exporting user data to CSV:', error);
        res.status(500).send('An error occurred');
      }
});


module.exports = router;

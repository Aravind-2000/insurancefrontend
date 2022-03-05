import React, { useState, useEffect } from 'react'
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import InsuranceApi from "../../Service/InsuranceApi";


function NotificationTable(
    {
        empid, employees
    }
) {

    const [notifications, setnotifications] = useState([]);

    useEffect(() => {
        getallnotifications();
    }, [employees])

    const getallnotifications = () =>{
        InsuranceApi.getEmployeeNotification(empid).then((response) =>{
            setnotifications(response.data)
        }).catch(error =>{
            console.log(error);
        })
    }

  return (
    <div>
    <div>
    <Stack sx={{ width: '50%'}} spacing={2} flexDirection="column-reverse" alignItems="center" alignContent="center">
        {
           notifications.map(
               notification =>
               <Stack key={notification.id} sx={{ width: '90%' }} spacing={6}>
                   {
                       (notification.notificationPriority === "Low") &&
                       (
                            <Alert variant="outlined" severity="success">
                                  <strong>{notification.notificationType}:</strong>  For Candidate ID :{notification.candidateId} {notification.notificationText} <strong>{notification.notificationPriority}</strong>
                            </Alert>
                        )
                   }
                   {
                       (notification.notificationPriority === "Medium") &&
                       (
                            <Alert variant="outlined" severity="info">
                                <strong>{notification.notificationType}:</strong>   Candidate ID:{notification.candidateId} {notification.notificationText} <strong>{notification.notificationPriority}</strong>
                            </Alert>
                        )
                   }
                   {
                       (notification.notificationPriority === "High") &&
                       (
                            <Alert variant="outlined" severity="success">
                                <strong>{notification.notificationType}:</strong> For Candidate ID :{notification.candidateId} {notification.notificationText} <strong> Priority :  {notification.notificationPriority}</strong>
                            </Alert>
                        )

                   }

               </Stack>
           )
        }
    </Stack>
    </div>
    </div>
  )
}

export default NotificationTable;
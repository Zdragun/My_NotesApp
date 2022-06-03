

export const getTasks = async (id) =>
{
    const res = await fetch(`http://10.0.2.2:5000/tasks/by-user/${id}`)
    
    return await res.json();
    
}

export const countTask = async (id)=>
{
    const res = await fetch(`http://10.0.2.2:5000/tasks/count/${id}`)
    return await res.json();
  
}

export const getTask = async (id)=>
{
    const res =  await fetch(`http://10.0.2.2:5000/tasks/${id}`);
    return await res.json();
}

export const saveTask = async (newTask)=>{
    const res = await fetch('http://10.0.2.2:5000/tasks',{
        method:'POST',
        headers:{Accept:'application/json','Content-Type': 'application/json'},
        body:JSON.stringify(newTask)
    })
    return await res.json();
}

export const deleteTask = async (id)=>{
    await fetch(`http://10.0.2.2:5000/tasks/${id}`,
    {
        method:'DELETE',
    })
}

export const updateTask = async (id, newTask)=>{
 
    const res = await fetch(`http://10.0.2.2:5000/tasks/${id}`,{
        method:'PUT',
        headers:{Accept:'application/json','Content-Type': 'application/json'},
        body:JSON.stringify(newTask),
    })
    return res;
}

